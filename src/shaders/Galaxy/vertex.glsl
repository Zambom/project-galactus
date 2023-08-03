uniform float uSize;
uniform float uTime;
uniform float uSpeed;
uniform float uDirection;

attribute float aScale;
attribute vec3 aRandomness;

varying vec3 vColor;

void main()
{
    vec4 newPosition = vec4(position, 1.0);

    // Spin
    float angle = atan(newPosition.x, newPosition.z);
    float distanceToCenter = length(newPosition.xz);
    float angleOffset = (1.0 / distanceToCenter) * uTime * uSpeed;

    angle += angleOffset * uDirection;

    newPosition.x = cos(angle) * distanceToCenter;
    newPosition.z = sin(angle) * distanceToCenter;

    newPosition.xyz += aRandomness;

    // Position
    vec4 modelPosition = modelMatrix * newPosition;
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;

    // Size
    gl_PointSize = uSize * aScale;
    gl_PointSize *= (1.0 / -viewPosition.z);

    // Color
    vColor = color;
}