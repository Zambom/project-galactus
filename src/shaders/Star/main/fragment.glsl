precision mediump float;

uniform vec3 uColorFactors;
uniform samplerCube uTexture;

varying vec3 vNormal;
varying vec3 vNormalw;
varying vec3 vEye;
varying vec3 vLayer0;
varying vec3 vLayer1;
varying vec3 vLayer2;

float render() {
    float sum = 0.0;

    sum += textureCube(uTexture, vLayer0).r;
    sum += textureCube(uTexture, vLayer1).r;
    sum += textureCube(uTexture, vLayer2).r;

    sum *= 0.33;

    return sum;
}

vec3 brightnessToColor(float b) {
    b *= 0.25;

    float r_factor = pow(b, uColorFactors.x);
    float g_factor = pow(b, uColorFactors.y);
    float b_factor = pow(b, uColorFactors.z);

    return (vec3(r_factor, g_factor, b_factor) / 0.25) * 0.6;
}

float Fresnel(vec3 eyeVector, vec3 worldNormal) {
    return pow(1.0 + dot(eyeVector, worldNormal), 3.0);
}

void main()
{
    float brightness = render() * 4.0 + 0.5;
    float fres = Fresnel(vEye, vNormalw);

    vec3 color = brightnessToColor(brightness + fres);

    float intensity = 1.55 - dot(vNormal, vec3(0.0, 0.0, 1.0));
    vec3 atmosphere = color * pow(intensity, 1.5);

    gl_FragColor = vec4(color + atmosphere, 1.0);
}