precision mediump float;

uniform vec3 uColorFactors;

varying vec3 vNormal;

vec3 brightnessToColor(float b) {
    b *= 0.25;

    float r_factor = pow(b, uColorFactors.x);
    float g_factor = pow(b, uColorFactors.y);
    float b_factor = pow(b, uColorFactors.z);

    return (vec3(r_factor, g_factor, b_factor) / 0.25) * 0.6;
}

void main()
{
    float intensity = pow(0.6 - dot(vNormal, vec3(0, 0, 1)), 2.0);
    vec3 color = brightnessToColor(1.3);

    gl_FragColor = vec4(color * intensity, 1.0);
}