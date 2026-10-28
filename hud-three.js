import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { Reflector } from 'three/addons/objects/Reflector.js';
import { BokehPass } from 'three/addons/postprocessing/BokehPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const host = document.querySelector('.hud-scene');
if (host) {
  let renderer;
  try { renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' }); }
  catch (error) { console.warn('WebGL unavailable; retaining the layered HUD.', error); }
  if (renderer) initHUD(renderer, host);
}

function initHUD(renderer, host) {
  const canvas = renderer.domElement;
  canvas.className = 'hud-webgl';
  canvas.setAttribute('aria-hidden', 'true');
  renderer.setClearColor(0x000000, 1);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.LinearToneMapping;
  renderer.toneMappingExposure = 0.95;
  host.prepend(canvas);
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 60);
  camera.position.set(0, 0, 10.4);
  const assembly = new THREE.Group();
  assembly.rotation.set(-0.70, 0.12, -0.20);
  assembly.position.y = -0.05;
  scene.add(assembly);
  const ambient = new THREE.AmbientLight(0x3863a3, 1.25); scene.add(ambient);
  const redLight = new THREE.PointLight(0xff2612, 24, 12); redLight.position.set(-3, 3, 4); scene.add(redLight);
  const blueLight = new THREE.PointLight(0x087bff, 32, 12); blueLight.position.set(3, -1, 4); scene.add(blueLight);
  const whiteLight = new THREE.DirectionalLight(0xd9f3ff, 2); whiteLight.position.set(-2, 5, 7); scene.add(whiteLight);
  const metal = new THREE.MeshStandardMaterial({color:0x0b172d, metalness:0.82, roughness:0.24});
  const trim = new THREE.MeshStandardMaterial({color:0x34557e, metalness:0.75, roughness:0.23});
  // Hot centers, saturated colored edges: light panels rather than flat neon strokes.
  function luminousPanel(edge, center) {
    return new THREE.ShaderMaterial({
      uniforms:{edge:{value:new THREE.Color().setRGB(...edge)},hot:{value:new THREE.Color().setRGB(...center)}},
      vertexShader:`varying vec2 panelUV;
      void main(){panelUV=uv;vec4 localPosition=vec4(position,1.0);
      #ifdef USE_INSTANCING
      localPosition=instanceMatrix*localPosition;
      #endif
      gl_Position=projectionMatrix*modelViewMatrix*localPosition;}`,
      fragmentShader:`varying vec2 panelUV;uniform vec3 edge;uniform vec3 hot;
      void main(){vec2 v=abs(panelUV-.5)*2.;float center=1.-pow(max(v.x,v.y),3.);gl_FragColor=vec4(mix(edge,hot,center),1.);}`
    });
  }
  const red=luminousPanel([1.28,.018,.006],[2.85,.50,.32]);
  const blue=luminousPanel([.016,.20,1.08],[.55,1.25,2.75]);
  const ice=new THREE.MeshBasicMaterial({color:new THREE.Color().setRGB(.28,.78,1.75)});
  const geometryCache = new Map();
  const rotors = [];
  function torus(radius, thickness, material, parent, z=0, length=Math.PI*2) {
    const key = [radius,thickness,length].join('/');
    if (!geometryCache.has(key)) geometryCache.set(key,new THREE.TorusGeometry(radius,thickness,8,Math.max(24,Math.round(length*32)),length));
    const mesh = new THREE.Mesh(geometryCache.get(key),material); mesh.position.z=z;parent.add(mesh);return mesh;
  }
  function annulus(radius, width, depth, material, parent) {
    const shape=new THREE.Shape();shape.absarc(0,0,radius,0,Math.PI*2,false);
    const hole=new THREE.Path();hole.absarc(0,0,radius-width,0,Math.PI*2,true);shape.holes.push(hole);
    const geo=new THREE.ExtrudeGeometry(shape,{depth,bevelEnabled:true,bevelSegments:2,steps:1,bevelSize:.014,bevelThickness:.014,curveSegments:96});
    const mesh=new THREE.Mesh(geo,material);mesh.position.z=-depth;parent.add(mesh);
  }
  const dummy=new THREE.Object3D();
  const layers=[
    {r:3.18,n:64,z:0,speed:.095,material:red,width:.115,length:.205},
    {r:2.28,n:48,z:.035,speed:-.14,material:blue,width:.100,length:.135},
    {r:1.55,n:60,z:.07,speed:.20,material:red,width:.036,length:.22},
    {r:1.05,n:44,z:.10,speed:-.26,material:blue,width:.046,length:.085},
    {r:.67,n:40,z:.13,speed:.33,material:red,width:.035,length:.10}
  ];
  layers.forEach((layer,index)=>{
    const group=new THREE.Group();group.position.z=layer.z;assembly.add(group);
    // Each ring has its own LED material; the palette remains shared and coordinated.
    const led=layer.material.clone();
    rotors.push({group,speed:layer.speed,led,colorPhase:[0,3,1,4,2][index],colorRate:.060,motion:{
      phase:Math.random()*Math.PI*2,
      secondaryPhase:Math.random()*Math.PI*2,
      frequency:.28+Math.random()*.24,
      secondaryFrequency:.53+Math.random()*.31,
      amplitude:.055+Math.random()*.035,
      tilt:.005+Math.random()*.006,
      radialPhase:Math.random()*Math.PI*2,
      radialRate:.65+Math.random()*.35,
      radialAmplitude:.018+Math.random()*.018
    }});
    annulus(layer.r+.10,index<2?.20:.075,.025,metal,group);
    torus(layer.r+.105,.007,trim,group,-.006);
    const ticks=new THREE.InstancedMesh(new THREE.BoxGeometry(layer.width,layer.length,.025),led,layer.n);
    for(let i=0;i<layer.n;i++){
      const angle=i/layer.n*Math.PI*2;
      dummy.position.set(Math.sin(angle)*layer.r,Math.cos(angle)*layer.r,.026);
      dummy.rotation.set(0,0,-angle);dummy.scale.set(1, index===2 && i%3===0 ? 1.9 : 1,1);
      dummy.updateMatrix();ticks.setMatrixAt(i,dummy.matrix);
    }
    ticks.instanceMatrix.needsUpdate=true;group.add(ticks);
    // Narrow inner arcs form layered reticles without turning the display into a solid disc.
    const arcMat=new THREE.MeshBasicMaterial({color:index%2?new THREE.Color(.32,.82,1.65):new THREE.Color(1.55,.22,.12)});
    rotors[rotors.length-1].arcMaterial=arcMat;
    for(let j=0;j<3;j++){
      const arc=torus(layer.r-.19,index===0?.014:.008,arcMat,group,.018,Math.PI*.45);
      arc.rotation.z=j*Math.PI*2/3+.15*index;
    }
    const linePoints=[];
    for(let i=0;i<layer.n;i++){
      const angle=i/layer.n*Math.PI*2;
      const start=layer.r+(index===0?.15:.10),end=start+(i%4===0?.15:.06);
      linePoints.push(Math.sin(angle)*start,Math.cos(angle)*start,.01,Math.sin(angle)*end,Math.cos(angle)*end,.01);
    }
    group.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(linePoints,3)),new THREE.LineBasicMaterial({color:index%2?0x60b9ff:0x3481bc,transparent:true,opacity:.8})));
  });
  // Recessed reticle: no raised gem or stacked pedestal.
  const heart=new THREE.Group();heart.position.z=.05;assembly.add(heart);
  const core=new THREE.Group();heart.add(core);
  // Golden five-pronged vajra: opposed lotus crowns join at a sculpted central grip.
  const vajra=new THREE.Group();core.add(vajra);vajra.scale.set(.98,.98,1.20);
  const vajraGold=new THREE.MeshStandardMaterial({color:0xecc164,metalness:.82,roughness:.19,emissive:0x7b3e05,emissiveIntensity:.10});
  const vajraEdge=new THREE.MeshStandardMaterial({color:0xffe5a0,metalness:.68,roughness:.16,emissive:0xa66512,emissiveIntensity:.10});
  function goldMesh(geometry,material=vajraGold){const mesh=new THREE.Mesh(geometry,material);vajra.add(mesh);return mesh;}
  function goldTube(points,radius,material=vajraGold){return goldMesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points),32,radius,8,false),material);}
  const gripProfile=[[-.22,.11],[-.17,.13],[-.11,.075],[0,.09],[.11,.075],[.17,.13],[.22,.11]].map(([z,r])=>new THREE.Vector2(r,z));
  const grip=goldMesh(new THREE.LatheGeometry(gripProfile,32));grip.rotation.x=Math.PI/2;
  goldMesh(new THREE.SphereGeometry(.112,24,16),vajraEdge);
  for(const sign of [-1,1]){
    for(const [radius,z] of [[.13,.17],[.155,.225],[.135,.27]]){
      const collar=goldMesh(new THREE.TorusGeometry(radius,.022,10,40),vajraEdge);collar.position.z=sign*z;
    }
    // Four outward-curving prongs and a central spike meet at the same tip.
    for(let i=0;i<4;i++){
      const angle=i*Math.PI/2+Math.PI/4;
      const profile=[[.10,.25],[.22,.36],[.265,.50],[.21,.64],[.10,.76],[0,.85]];
      goldTube(profile.map(([r,z])=>new THREE.Vector3(Math.cos(angle)*r,Math.sin(angle)*r,sign*z)),.023);
    }
    for(let i=0;i<8;i++){
      const angle=i*Math.PI/4;
      goldTube([[.08,.18],[.16,.24],[.17,.29],[.11,.32]].map(([r,z])=>new THREE.Vector3(Math.cos(angle)*r,Math.sin(angle)*r,sign*z)),.013,vajraEdge);
    }
    const stem=goldMesh(new THREE.CylinderGeometry(.018,.033,.45,12),vajraEdge);stem.rotation.x=Math.PI/2;stem.position.z=sign*.54;
    const tip=goldMesh(new THREE.SphereGeometry(.027,12,8),vajraEdge);tip.position.z=sign*.85;
  }
  const vajraLight=new THREE.PointLight(0xffd690,2.8,3);vajraLight.position.set(-.4,.4,1.2);heart.add(vajraLight);
  // Additive plasma climbs the vajra axis, leaving its golden prongs readable.
  const plasmaUniforms={time:{value:0}};
  const plasmaGeometry=new THREE.CylinderGeometry(.012,.055,1.85,32,48,true);
  const plasmaMaterial=new THREE.ShaderMaterial({
    uniforms:plasmaUniforms,transparent:true,depthWrite:false,side:THREE.DoubleSide,blending:THREE.AdditiveBlending,
    vertexShader:`uniform float time;varying vec2 plasmaUV;
      void main(){plasmaUV=uv;vec3 p=position;float height=uv.y;
      p.x+=sin(height*14.-time*4.2)*.014*height;
      p.z+=cos(height*19.-time*3.6)*.014*height;
      gl_Position=projectionMatrix*modelViewMatrix*vec4(p,1.);}`,
    fragmentShader:`uniform float time;varying vec2 plasmaUV;
      void main(){float h=plasmaUV.y;
      float streak=pow(.5+.5*sin(plasmaUV.x*37.7-h*13.+time*4.),3.);
      float flicker=.82+.12*sin(h*28.-time*12.)+.06*sin(h*51.-time*17.);
      float envelope=smoothstep(0.,.12,h)*(1.-smoothstep(.58,1.,h));
      float strength=envelope*(.20+.52*streak)*flicker;
      vec3 color=mix(vec3(.10,.48,1.65),vec3(1.5,2.0,2.6),streak);
      gl_FragColor=vec4(color,strength*.48);}`
  });
  const plasma=new THREE.Mesh(plasmaGeometry,plasmaMaterial);
  plasma.rotation.x=Math.PI/2;plasma.position.z=.35;core.add(plasma);
  const sparkCount=72,sparkPositions=new Float32Array(sparkCount*3),sparkSeeds=[];
  for(let i=0;i<sparkCount;i++)sparkSeeds.push({phase:Math.random(),angle:Math.random()*Math.PI*2,speed:.38+Math.random()*.45,radius:.06+Math.random()*.13});
  const sparkGeometry=new THREE.BufferGeometry();sparkGeometry.setAttribute('position',new THREE.BufferAttribute(sparkPositions,3));
  const sparkCanvas=document.createElement('canvas');sparkCanvas.width=sparkCanvas.height=32;
  const sparkContext=sparkCanvas.getContext('2d');const sparkGradient=sparkContext.createRadialGradient(16,16,0,16,16,16);
  sparkGradient.addColorStop(0,'#ffffff');sparkGradient.addColorStop(.2,'#c5eeff');sparkGradient.addColorStop(.5,'#3c9dff66');sparkGradient.addColorStop(1,'#3c9dff00');sparkContext.fillStyle=sparkGradient;sparkContext.fillRect(0,0,32,32);
  const sparkTexture=new THREE.CanvasTexture(sparkCanvas);
  const sparks=new THREE.Points(sparkGeometry,new THREE.PointsMaterial({map:sparkTexture,color:0xa9dcff,size:.027,transparent:true,opacity:.65,depthWrite:false,blending:THREE.AdditiveBlending}));core.add(sparks);
  const plasmaLight=new THREE.PointLight(0x6cbfff,1.5,2);plasmaLight.position.z=.4;core.add(plasmaLight);
  const arcCore=new THREE.Mesh(new THREE.SphereGeometry(.042,16,12),new THREE.MeshBasicMaterial({color:new THREE.Color(1.3,1.9,2.4)}));
  arcCore.scale.set(.65,.65,2.2);arcCore.position.z=.12;core.add(arcCore);
  const burstCount=14,burstPositions=new Float32Array(burstCount*6);
  const burstGeometry=new THREE.BufferGeometry();burstGeometry.setAttribute('position',new THREE.BufferAttribute(burstPositions,3));
  const arcStreaks=new THREE.LineSegments(burstGeometry,new THREE.LineBasicMaterial({color:new THREE.Color(.35,1.2,2.8),transparent:true,opacity:.52,blending:THREE.AdditiveBlending,depthWrite:false}));core.add(arcStreaks);



  for(let i=0;i<7;i++)torus(.14+i*.045,.003,new THREE.MeshBasicMaterial({color:0x246497,transparent:true,opacity:.55}),heart,-i*.018);
  const crossPoints=[-.12,0,0,.12,0,0,0,-.12,0,0,.12,0];
  heart.add(new THREE.LineSegments(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(crossPoints,3)),new THREE.LineBasicMaterial({color:0x73beff})));
  const grid=new THREE.GridHelper(11,44,0x27577d,0x132e4d);grid.rotation.x=Math.PI/2;grid.position.z=-.16;grid.material.transparent=true;grid.material.opacity=.18;assembly.add(grid);
  // A real planar reflection follows every rotor and camera movement.
  const mirror = new Reflector(new THREE.PlaneGeometry(11,11), {
    textureWidth:window.innerWidth<700?512:768,textureHeight:window.innerWidth<700?512:768,
    clipBias:.004,color:0x080e18,multisample:0
  });
  mirror.position.z=-.46;
  mirror.material.vertexShader=mirror.material.vertexShader.replace('varying vec4 vUv;','varying vec4 vUv; varying vec2 mirrorUv;').replace('vUv = textureMatrix','mirrorUv = uv; vUv = textureMatrix');
  mirror.material.fragmentShader=mirror.material.fragmentShader.replace('varying vec4 vUv;','varying vec4 vUv; varying vec2 mirrorUv;').replace('vec4( blendOverlay( base.rgb, color ), 1.0 )','vec4(base.rgb * .12 * smoothstep(0.0,.20,mirrorUv.x) * smoothstep(0.0,.20,1.0-mirrorUv.x) * smoothstep(0.0,.20,mirrorUv.y) * smoothstep(0.0,.20,1.0-mirrorUv.y),1.0)');
  const renderReflection=mirror.onBeforeRender;
  mirror.onBeforeRender=function(renderer,scene,camera,...args){if(!scene.overrideMaterial)renderReflection.call(this,renderer,scene,camera,...args);};
  assembly.add(mirror);
  // Real text planes and leader lines occupy the same tilted 3D surface as the rings.
  const textTextures=[];
  function textPlane(text,x,y,width,size=20,opacity=.85) {
    const c=document.createElement('canvas');c.width=512;c.height=256;
    const ctx=c.getContext('2d');ctx.font=`${size}px monospace`;ctx.fillStyle='#83c8ff';
    text.split('\n').forEach((line,i)=>ctx.fillText(line,8,30+i*(size+7)));
    const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;textTextures.push(texture);
    const mesh=new THREE.Mesh(new THREE.PlaneGeometry(width,width*.5),new THREE.MeshBasicMaterial({map:texture,transparent:true,opacity,depthWrite:false,side:THREE.DoubleSide,toneMapped:false}));
    mesh.position.set(x,y,.04);assembly.add(mesh);
  }
  textPlane('NEURAL_RESONANCE {\n  input: motion.vector;\n  phase: synchronize();\n  carrier: ML_CORE;\n  render(spatial_field);\n}',-2.7,.95,1.4,19,.70);
  textPlane('SIGNAL / 093.56\nFRAME.ALIGN = ACTIVE\n\n// audio pipeline\nposition.xyz();\nphase.lock();',2.9,-.4,1.4,19,.75);
  textPlane('93.56\n\n1012.5',1.95,.55,.95,27,.95);
  textPlane('RESONANCE.PROTOCOL\n[ ML / NE-01 ]',-1.9,-2.7,1.6,17,.8);
  const leaders=[[-3.8,1.8,-1.3,1.1],[-3.3,-1.9,-1.15,-.4],[1.15,.45,3.6,1.0],[1.8,-.9,3.8,-1.5],[-.6,2.9,-.2,1.0]];
  leaders.forEach(([x,y,x2,y2])=>{
    const geo=new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(x,y,.045),new THREE.Vector3(x2,y2,.045)]);
    assembly.add(new THREE.Line(geo,new THREE.LineBasicMaterial({color:0x79bfff,transparent:true,opacity:.8})));
  });
  const particlePositions=[];
  for(let i=0;i<90;i++)particlePositions.push((Math.random()-.5)*8,(Math.random()-.5)*7,(Math.random()-.5)*2-1.4);
  const particles=new THREE.Points(new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(particlePositions,3)),new THREE.PointsMaterial({color:0x258dff,size:.018,transparent:true,opacity:.6}));scene.add(particles);
  const composer = new EffectComposer(renderer);
  composer.addPass(new RenderPass(scene,camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(600,600),.29,.04,.82);composer.addPass(bloom);
  const dof=new BokehPass(scene,camera,{focus:8.1,aperture:0,maxblur:0});
  composer.insertPass(dof,1);
  composer.addPass(new OutputPass());
  let active=false,frame=0,last=0,disposed=false,elapsed=0;
  const pointer={x:0,y:0};
  // Smooth random orientation targets, sampled in animation time so pausing freezes the axis.
  const randomAxis=()=>({x:(Math.random()-.5)*.30,y:(Math.random()-.5)*.36,z:(Math.random()-.5)*.22});
  let axisFrom={x:0,y:0,z:0},axisTo=randomAxis(),axisStart=0,axisDuration=5+Math.random()*4;
  function axisAt(time){
    if(time-axisStart>=axisDuration){axisFrom=axisTo;axisTo=randomAxis();axisStart=time;axisDuration=5+Math.random()*4;}
    const p=Math.min(1,Math.max(0,(time-axisStart)/axisDuration));
    const ease=p*p*p*(p*(p*6-15)+10);
    return {x:axisFrom.x+(axisTo.x-axisFrom.x)*ease,y:axisFrom.y+(axisTo.y-axisFrom.y)*ease,z:axisFrom.z+(axisTo.z-axisFrom.z)*ease};
  }

  const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const parent=host.closest('.reactor');
  const stage=host.closest('.hero-cockpit') || parent;
  const finePointer=matchMedia('(hover: hover) and (pointer: fine)');
  stage.addEventListener('pointermove',event=>{
    if(!finePointer.matches || reduce.matches)return;
    const box=stage.getBoundingClientRect();
    pointer.x=THREE.MathUtils.clamp((event.clientX-box.left)/box.width-.5,-.5,.5);
    pointer.y=THREE.MathUtils.clamp((event.clientY-box.top)/box.height-.5,-.5,.5);
  });
  stage.addEventListener('pointerleave',()=>{pointer.x=0;pointer.y=0;});
  // Shared curated spectrum in linear light: no abrupt hue jumps or unrelated random RGB.
  // Curated cool/warm palettes instead of a full-spectrum rainbow sweep.
  // Neighboring rings retain different material roles in every palette.
  // Locked user-selected visual tuning parameters:
  const tuning={
    ledGain:2.20,
    edgePower:3.0,
    bloomStrength:0.08,
    bloomThreshold:0.76,
    bloomRadius:0.000,
    exposure:0.52,
    mirrorReflect:0.04,
    gridOpacity:0.32,
    plasmaOpacity:1.00
  };
  try{localStorage.removeItem('ml_hud_tuning');}catch{}

  const ringSpecs=[
    {edge:[1.15,.012,.004], hot:[2.35,.38,.24], arc:[1.25,.18,.08], baseRadiance:1.0},
    {edge:[.012,.16,.95], hot:[.38,.98,2.35], arc:[.24,.68,1.35], baseRadiance:1.0},
    {edge:[1.20,.014,.005], hot:[2.45,.40,.26], arc:[1.30,.20,.09], baseRadiance:1.0},
    {edge:[.018,.20,1.02], hot:[.45,1.08,2.45], arc:[.28,.75,1.45], baseRadiance:1.0},
    {edge:[1.15,.012,.004], hot:[2.35,.38,.24], arc:[1.25,.18,.08], baseRadiance:1.0}
  ];
  function updateLED(rotor,time){
    const index=rotors.indexOf(rotor);
    const spec=ringSpecs[index]||ringSpecs[0];
    const g=tuning.ledGain;
    rotor.led.uniforms.edge.value.setRGB(spec.edge[0]*g,spec.edge[1]*g,spec.edge[2]*g);
    rotor.led.uniforms.hot.value.setRGB(spec.hot[0]*g,spec.hot[1]*g,spec.hot[2]*g);
    rotor.baseRadiance=spec.baseRadiance*g;
    rotor.arcMaterial.color.setRGB(spec.arc[0]*g,spec.arc[1]*g,spec.arc[2]*g);
  }
  function applyTuning(){
    renderer.toneMappingExposure=tuning.exposure;
    bloom.strength=tuning.bloomStrength;
    bloom.threshold=tuning.bloomThreshold;
    bloom.radius=tuning.bloomRadius;
    grid.material.opacity=tuning.gridOpacity;
    sparks.material.opacity=tuning.plasmaOpacity*.9;
    arcStreaks.material.opacity=tuning.plasmaOpacity*.8;
    plasma.visible=tuning.plasmaOpacity>0.02;
    sparks.visible=tuning.plasmaOpacity>0.02;
    arcStreaks.visible=tuning.plasmaOpacity>0.02;
    arcCore.visible=tuning.plasmaOpacity>0.02;
    mirror.visible=tuning.mirrorReflect>0.005;
    rotors.forEach(r=>updateLED(r,elapsed));
    render(0);
  }
  applyTuning();
  function render(dt=0){
    const boost=document.documentElement.classList.contains('overdrive');elapsed+=dt;
    rotors.forEach((rotor,index)=>{
      const {group,speed,motion}=rotor;
      updateLED(rotor,elapsed);
      group.rotation.z+=dt*speed*(boost?3:1);
      // Independent, bounded smooth waves avoid frame-to-frame random jitter.
      const t=elapsed;
      const primary=Math.sin(t*motion.frequency+motion.phase);
      const secondary=Math.sin(t*motion.secondaryFrequency+motion.secondaryPhase);
      group.position.z=layers[index].z+motion.amplitude*(primary*.72+secondary*.28);
      group.rotation.x=Math.sin(t*motion.frequency*.77+motion.secondaryPhase)*motion.tilt;
      group.rotation.y=Math.cos(t*motion.secondaryFrequency*.63+motion.phase)*motion.tilt;
      // Radial breathing remains concentric and bounded, like staggered sound waves.
      const wave=Math.sin(t*motion.radialRate+motion.radialPhase)*.72
        +Math.sin(t*motion.radialRate*1.71+motion.secondaryPhase)*.28;
      const diameter=1+wave*motion.radialAmplitude*(boost?1.25:1);
      group.scale.set(diameter,diameter,1);
      const radiance=rotor.baseRadiance*(1+(wave+1)*.055);
      const spec=ringSpecs[index]||ringSpecs[0];
      rotor.led.uniforms.hot.value.setRGB(spec.hot[0]*radiance,spec.hot[1]*radiance,spec.hot[2]*radiance);

    });
    core.rotation.z+=dt*.25;
    core.position.z=.62+Math.sin(elapsed*.82)*.14;
    plasmaUniforms.time.value=elapsed;
    sparkSeeds.forEach((seed,i)=>{
      const p=(seed.phase+elapsed*seed.speed)%1,angle=seed.angle+elapsed*.7+p*5;
      const radius=seed.radius*(.18+p*1.25);
      sparkPositions[i*3]=Math.cos(angle)*radius;
      sparkPositions[i*3+1]=Math.sin(angle)*radius;
      sparkPositions[i*3+2]=-.25+p*1.8;
    });
    sparkGeometry.attributes.position.needsUpdate=true;
    for(let i=0;i<burstCount;i++){
      const seed=sparkSeeds[i],p=(seed.phase+elapsed*seed.speed*1.4)%1;
      const angle=seed.angle+Math.sin(elapsed*.7+i)*.25,r=.025+p*seed.radius*1.8;
      const z=.12+p*1.25-p*p*.45;
      const tail=Math.max(0,p-.055);
      burstPositions.set([Math.cos(angle)*r,Math.sin(angle)*r,z,Math.cos(angle)*(.025+tail*seed.radius*1.8),Math.sin(angle)*(.025+tail*seed.radius*1.8),.12+tail*1.25-tail*tail*.45],i*6);
    }
    burstGeometry.attributes.position.needsUpdate=true;
    plasmaLight.intensity=1.0+Math.sin(elapsed*10)*.08+Math.sin(elapsed*15.3)*.04;
    const axis=axisAt(elapsed);
    const driftX = Math.sin(elapsed*.24)*.025;
    const driftY = Math.cos(elapsed*.19)*.045;
    assembly.rotation.x+=((-0.72+axis.x+driftX-pointer.y*.50)-assembly.rotation.x)*.055;
    assembly.rotation.y+=((.04+axis.y+driftY+pointer.x*.68)-assembly.rotation.y)*.055;
    assembly.rotation.z+=((-.36+axis.z+Math.sin(elapsed*.13)*.025-pointer.x*.10)-assembly.rotation.z)*.055;
    const compact = host.clientWidth < 650;
    assembly.position.x = compact ? 0 : .65;
    assembly.position.y = compact ? (-.28 + Math.sin(elapsed*.45)*.04) : (-.05 + Math.sin(elapsed*.45)*.065);
    camera.position.z = (compact ? 9.8 : 8.1) + Math.sin(elapsed*.22)*.10;
    dof.uniforms.focus.value=camera.position.z;;
    particles.rotation.z=Math.sin(elapsed*.08)*.06;
    heart.position.z=.05;
    bloom.strength=boost?tuning.bloomStrength*1.45:tuning.bloomStrength;
    composer.render();
  }
  function tick(now){if(disposed)return;const dt=Math.min(.04,(now-(last||now))/1000);last=now;render(dt);frame=requestAnimationFrame(tick);}
  function sync(){
    cancelAnimationFrame(frame);frame=0;last=0;
    if(disposed)return;
    const isDocked=document.documentElement.classList.contains('hero-is-docked');
    if((active||isDocked)&&!document.hidden&&!reduce.matches&&!document.documentElement.classList.contains('motion-paused'))frame=requestAnimationFrame(tick);
    else render(0);
  }
  function resize(){const rect=host.getBoundingClientRect();const w=Math.max(1,rect.width),h=Math.max(1,rect.height);renderer.setSize(w,h,false);composer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();render(0);}
  const observer=new ResizeObserver(resize);observer.observe(host);
  const visibility=new IntersectionObserver(entries=>{
    const isDocked=document.documentElement.classList.contains('hero-is-docked');
    active=entries[0].isIntersecting||isDocked;
    sync();
  });visibility.observe(host);
  const state=new MutationObserver(sync);state.observe(document.documentElement,{attributes:true,attributeFilter:['class']});
  reduce.addEventListener('change',sync);document.addEventListener('visibilitychange',sync);
  canvas.addEventListener('webglcontextlost',event=>{event.preventDefault();active=false;cancelAnimationFrame(frame);host.classList.remove('webgl-ready');});
  canvas.addEventListener('webglcontextrestored',()=>{host.classList.add('webgl-ready');active=true;resize();sync();});
  resize();host.classList.add('webgl-ready');parent.classList.add('three-reactor');
  window.addEventListener('pagehide',event=>{
    if(event.persisted)return;disposed=true;cancelAnimationFrame(frame);observer.disconnect();visibility.disconnect();state.disconnect();
    document.removeEventListener('visibilitychange',sync);reduce.removeEventListener('change',sync);
    const geometries=new Set(),materials=new Set();scene.traverse(o=>{if(o.geometry)geometries.add(o.geometry);if(o.material)(Array.isArray(o.material)?o.material:[o.material]).forEach(m=>materials.add(m));});
    mirror.getRenderTarget().dispose();sparkTexture.dispose();textTextures.forEach(texture=>texture.dispose());geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());composer.passes.forEach(p=>p.dispose?.());composer.dispose();renderer.dispose();
  });
}
