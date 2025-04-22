import * as os from 'os';

export function getLocalIPAddresses(): string[] {
    const networkInterfaces = os.networkInterfaces();
    const ipAddresses: string[] = [];

    for (const interfaceName in networkInterfaces) {
        networkInterfaces[interfaceName]?.forEach((networkInterface) => {
            if (networkInterface.family === 'IPv4' && !networkInterface.internal) {
                ipAddresses.push(networkInterface.address);
            }
        });
    }

    return ipAddresses;
}

export function printAppRunningMessage(port: number) {
    const ipAddresses = ['localhost', ...getLocalIPAddresses()];
    ipAddresses.forEach((ip) => {
        console.log(`App is running at http://${ip}:${port}`);
    });
}
