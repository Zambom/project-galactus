varying vec2 vUv;
varying vec3 vPosition;

float sdCircle(vec2 p, float r) {
    return length(p) - r;
}

vec4 fromLinear(vec4 linearRGB) {
    bvec3 cutoff = lessThan(linearRGB.rgb, vec3(0.0031308));
    vec3 higher = vec3(1.055) * pow(linearRGB.rgb, vec3(1.0/2.4)) - vec3(0.055);
    vec3 lower = linearRGB.rgb * vec3(12.92);

    return vec4(mix(higher, lower, cutoff), linearRGB.a);
}

void main()
{
    float size = 0.05;
    float radius = 0.35;
    float toCenter = distance(vPosition, vec3(0.5));
    float strength = 1.0 - step(size, abs(distance(vUv, vec2(0.5)) - radius));

    /*if (strength < 0.01) {
        discard;
    }*/

    vec3 black = vec3(0.53, 0.2, 0.66);
    //vec3 black = vec3(1.0);
    vec3 uvColor = vec3(0.65, 0.2, 0.42);

    vec3 mixed = mix(black, uvColor, toCenter);


    float distToCenter = sdCircle(vUv - vec2(0.5), 0.30);
    float distToCenter2 = sdCircle(vUv - vec2(0.5), 0.5);

    vec3 color = distToCenter > 0.0 ? black : uvColor;
    color = color * (1.2 - exp(-5.0 * abs(distToCenter)));
    color = color * 0.8 + color * 0.2 * sin(50.0 * distToCenter);
    //color = color + 0.1;
    color = mix(uvColor, color, 4.5 * abs(distToCenter));

    float opacity = 1.0;

    if (distToCenter2 > 0.0) {
        opacity = 0.0;
    } else if (distToCenter2 <= 0.0 && distToCenter >= 0.0) {
        opacity = 8.0 * distToCenter;
    } else {
        opacity = 0.0;
    }

    gl_FragColor = vec4(color, opacity);
}