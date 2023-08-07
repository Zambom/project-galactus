varying vec3 vPosition;

void main()
{
    vPosition = position;

    vec4 result = vec4(position.x, position.y, position.z, 1.0);

    gl_Position = projectionMatrix * modelViewMatrix * result;
}