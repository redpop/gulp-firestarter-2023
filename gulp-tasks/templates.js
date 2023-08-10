import spawn from 'cross-spawn';

export default function templates() {
    return spawn('npx', ['eleventy', '--quiet'], {
        stdio: 'inherit',
    });
}
