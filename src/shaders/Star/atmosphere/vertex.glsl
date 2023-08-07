varying vec3 vNormal;

void main()
{
    vNormal = normalize(normalMatrix * normal);

    vec4 result = vec4(position, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * result;
}