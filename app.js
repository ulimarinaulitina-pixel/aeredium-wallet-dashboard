const connectButton = document.getElementById("connectButton");
const switchButton = document.getElementById("switchButton");

switchButton.addEventListener("click", switchNetwork);
const status = document.getElementById("status");
const walletAddress = document.getElementById("walletAddress");
const networkName = document.getElementById("networkName");
const walletBalance = document.getElementById("walletBalance");

connectButton.addEventListener("click", connectWallet);

let provider;

async function connectWallet() {

    if (typeof window.ethereum === "undefined") {
        alert("Please install Rabby Wallet or MetaMask.");
        return;
    }

    try {

        provider = new ethers.providers.Web3Provider(window.ethereum);

        await provider.send("eth_requestAccounts", []);

        const signer = provider.getSigner();

        const address = await signer.getAddress();

        const network = await provider.getNetwork();

        const balance = await provider.getBalance(address);

        status.textContent = "Connected";
        status.style.color = "#4ade80";

        walletAddress.textContent = address;

        networkName.textContent =
            `${network.name} (Chain ID: ${network.chainId})`;

        walletBalance.textContent =
            `${parseFloat(
                ethers.utils.formatEther(balance)
            ).toFixed(5)} ETH`;

    } catch (err) {

        console.error(err);

        status.textContent = "Connection failed";
        status.style.color = "#ff5d5d";

        alert("Wallet connection failed.");

    }

}

if (window.ethereum) {

    window.ethereum.on("accountsChanged", () => {
        connectWallet();
    });

    window.ethereum.on("chainChanged", () => {
        location.reload();
    });

}
    async function switchNetwork() {

    if (!window.ethereum) {
        alert("Please install Rabby Wallet.");
        return;
    }

    const chainId = "0x4d5"; // 1237

    try {

        await window.ethereum.request({

            method: "wallet_switchEthereumChain",

            params: [{ chainId }]

        });

        connectWallet();

    }

    catch (error) {

        if (error.code === 4902) {

            try {

                await window.ethereum.request({

                    method: "wallet_addEthereumChain",

                    params: [{

                        chainId: "0x4d5",

                        chainName: "AEREDIUM Testnet",

                        nativeCurrency: {

                            name: "AERX",

                            symbol: "AERX",

                            decimals: 18

                        },

                        rpcUrls: [

                            "https://testnet.rpc.aeredium.io"

                        ],

                        blockExplorerUrls: [

                            "https://testnet.explorer.aeredium.io"

                        ]

                    }]

                });

                connectWallet();

            }

            catch (err) {

                console.error(err);

                alert("Failed to add AEREDIUM Testnet.");

            }

        }

        else {

            console.error(error);

        }

    }

}   



 
   

  
      

          

                      
                       

           

    
  
       

  



          

   
     

 


