const connectBtn = document.getElementById("connect");
const switchBtn = document.getElementById("switchNetwork");

const wallet = document.getElementById("wallet");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const statusText = document.getElementById("status");

let provider;

const NETWORKS = {
    1: "Ethereum Mainnet",
    42161: "Arbitrum One",
    8453: "Base",
    137: "Polygon",
    56: "BNB Chain",
    10: "Optimism",
    11155111: "Sepolia",
    1237: "AEREDIUM Testnet"
};

connectBtn.addEventListener("click", connectWallet);

if (switchBtn) {
    switchBtn.addEventListener("click", switchNetwork);
}

async function connectWallet() {

    if (!window.ethereum) {
        alert("Please install Rabby Wallet or MetaMask.");
        return;
    }

    try {

        provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();

        const address = await signer.getAddress();

        const net = await provider.getNetwork();

        const ethBalance = await provider.getBalance(address);

        wallet.innerText = address;

        network.innerText =
            (NETWORKS[net.chainId] || net.name) + " (" + net.chainId + ")";

        balance.innerText =
            Number(ethers.utils.formatEther(ethBalance)).toFixed(5) + " ETH";

        statusText.innerText = "Connected";

        statusText.style.color = "#53ff89";

    } catch (err) {

        console.log(err);

        statusText.innerText = "Connection failed";

        statusText.style.color = "red";

    }

}

async function switchNetwork() {

    if (!window.ethereum) return;

    try {

        await window.ethereum.request({

            method: "wallet_switchEthereumChain",

            params: [{ chainId: "0x4d5" }]

        });

    }

    catch (switchError) {

        if (switchError.code === 4902) {

            try {

                await window.ethereum.request({

                    method: "wallet_addEthereumChain",

                    params: [{

                        chainId: "0x4d5",

                        chainName: "AEREDIUM Testnet",

                        rpcUrls: [
                            "https://testnet.rpc.aeredium.io"
                        ],

                        nativeCurrency: {

                            name: "AERX",

                            symbol: "AERX",

                            decimals: 18

                        },

                        blockExplorerUrls: [
                            "https://testnet.explorer.aeredium.io"
                        ]

                    }]

                });

            }

            catch (addError) {

                console.log(addError);

                alert("Unable to add AEREDIUM Testnet.");

            }

        }

        else {

            console.log(switchError);

            alert("Switch network failed.");

        }

    }

}

if (window.ethereum) {

    window.ethereum.on("accountsChanged", connectWallet);

    window.ethereum.on("chainChanged", () => {

        connectWallet();

    });

}const connectBtn = document.getElementById("connect");
const switchBtn = document.getElementById("switchNetwork");

const wallet = document.getElementById("wallet");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const statusText = document.getElementById("status");

let provider;

const NETWORKS = {
    1: "Ethereum Mainnet",
    42161: "Arbitrum One",
    8453: "Base",
    137: "Polygon",
    56: "BNB Chain",
    1237: "AEREDIUM Testnet"
};

connectBtn.onclick = connectWallet;
switchBtn.onclick = switchNetwork;

async function connectWallet() {

    if (!window.ethereum) {
        alert("Install Rabby or MetaMask.");
        return;
    }

    provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    const chain = await provider.getNetwork();

    const ethBalance = await provider.getBalance(address);

    wallet.textContent = address;

    network.textContent =
        NETWORKS[chain.chainId] || `${chain.name} (${chain.chainId})`;

    balance.textContent =
        Number(ethers.utils.formatEther(ethBalance)).toFixed(4) + " ETH";

    statusText.textContent = "Connected";

}

async function switchNetwork() {

    if (!window.ethereum) return;

    try {

        await window.ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4d5" }]
        });

    }

    catch (e) {

        alert(
            "AEREDIUM Testnet is not added to your wallet yet. Add it manually."
        );

    }

}

if (window.ethereum) {

    window.ethereum.on("accountsChanged", connectWallet);

    window.ethereum.on("chainChanged", () => location.reload());

}
