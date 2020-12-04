import BurnerConnectProvider from "@burner-wallet/burner-connect-provider";
import Authereum from "authereum";
import ethProvider from "eth-provider";
import Torus from "@toruslabs/torus-embed";

const providerOptions = {
    burnerconnect: {
        package: BurnerConnectProvider, // required
        options: {
            defaultNetwork: "100"
        }
    },
    authereum: {
        package: Authereum // required
    },
    frame: {
        package: ethProvider // required
    },
    torus: {
        package: Torus, // required
    }
}

export default providerOptions