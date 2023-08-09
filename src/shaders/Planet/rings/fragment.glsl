uniform float uOpacity;
uniform vec3 uInnerColor;
uniform vec3 uOuterColor;

varying vec2 vUv;

void main()
{
    float size = 0.05;
    float radius = 0.35;
    float toCenter = abs(distance(vUv, vec2(0.5)));
    float strength = 1.0 - step(size, abs(distance(vUv, vec2(0.5)) - radius));

    if (strength < 0.01) {
        discard;
    }

    vec3 outerColor = uOuterColor;
    vec3 innerColor = uInnerColor;

    float opacity = uOpacity;

    vec3 color = vec3(toCenter);

    if (toCenter <= 0.301) {
        opacity *= 0.9;
        color = outerColor;
    } else if (toCenter > 0.301 && toCenter < 0.325) {
        opacity *= 0.9;
        color = innerColor * 0.98;
    } else if (toCenter > 0.325 && toCenter < 0.33) {
        opacity *= 0.75;
        color = innerColor * 0.84;
    } else if (toCenter > 0.33 && toCenter < 0.335) {
        opacity *= 0.8;
        color = innerColor * 0.73;
    } else if (toCenter > 0.335 && toCenter < 0.34) {
        opacity *= 0.8;
        color = innerColor * 0.93;
    } else if (toCenter > 0.34 && toCenter < 0.35) {
        opacity *= 0.8;
        color = innerColor * 0.9;
    } else if (toCenter > 0.35 && toCenter < 0.355) {
        opacity *= 0.8;
        color = innerColor;
    } else if (toCenter > 0.355 && toCenter < 0.362) {
        opacity *= 0.8;
        color = innerColor * 0.8;
    } else if (toCenter > 0.362 && toCenter < 0.363) {
        opacity *= 0.5;
        color = outerColor - 0.03;
    } else if (toCenter > 0.363 && toCenter < 0.374) {
        opacity *= 0.8;
        color = outerColor * 1.69;
    } else if (toCenter > 0.374 && toCenter < 0.385) {
        opacity *= 0.75;
        color = outerColor * 1.5;
    } else if (toCenter > 0.385 && toCenter < 0.395) {
        opacity *= 0.75;
        color = outerColor * 2.0;
    } else if (toCenter > 0.395) {
        opacity *= 0.5;
        color = outerColor;
    }

    gl_FragColor = vec4(color, opacity);
}