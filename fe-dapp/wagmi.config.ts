import { linea, mainnet } from "viem/chains";
import { cookieStorage, createConfig, createStorage, http } from "wagmi";
import { metaMask } from "wagmi/connectors";

export function getConfig() {
    return createConfig({
        chains: [mainnet, linea],
        connectors: [metaMask()],
        ssr: true,
        storage: createStorage({
            storage: cookieStorage
        }),
        transports: {
            [linea.id]: http(),
            [mainnet.id]: http()
        }
    })
}