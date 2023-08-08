precision mediump float;

varying vec3 vPosition;

void main()
{
    float nStripes = 4.0;
    vec3 pos = vPosition;
    pos.y = ((pos.y + 1.0) / 2.0) * 8.0;

    vec3 color = vec3(1, 0.0, 0.0);

    gl_FragColor = vec4(color * mod(pos.y, nStripes), 1.0);
}