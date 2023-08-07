uniform float uTime;

varying vec3 vNormal;
varying vec3 vNormalw;
varying vec3 vEye;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

mat2 rotate(float angle) {
    float s = sin(angle);
    float c = cos(angle);

    return mat2(c, -s, s, c);
}

void main()
{
    vNormal = normalize(normalMatrix * normal);
    vNormalw = normalize(vec3(vec4(normal, 0.0) * modelMatrix));

    float time = uTime * 0.02;

    vec3 p0 = position;
    p0.yz = rotate(time) * p0.yz;
    vLayer0 = p0;
    
    vec3 p1 = position;
    p1.xz = rotate(time + 10.0) * p1.xz;
    vLayer1 = p1;
    
    vec3 p2 = position;
    p2.xy = rotate(time + 30.0) * p2.xy;
    vLayer2 = p2;

    vec4 result = vec4(position.x, position.y, position.z, 1.0);

    vec4 worldPosition = modelMatrix * result;

    vEye = normalize(worldPosition.xyz - cameraPosition);

    gl_Position = projectionMatrix * modelViewMatrix * result;
}