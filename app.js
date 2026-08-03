const connectButton = document.getElementById("connectButton");
const status = document.getElementById("status");
const wallet = document.getElementById("wallet");
const network = document.getElementById("network");
const balance = document.getElementById("balance");
const switchButton = document.getElementById("switchNetwork");

connectButton.onclick = connectWallet;
switchButton.onclick = switchNetwork;

async function connectWallet() {
    if (!window.ethereum) {
        alert("Please install Rabby or MetaMask");
        return;
    }

    try {
        await ethereum.request({ method: "eth_requestAccounts" });

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        const address = await signer.getAddress();

        const net = await provider.getNetwork();

        const bal = await provider.getBalance(address);

        status.innerHTML = "Connected";
        status.style.color = "#4CAF50";

        wallet.innerHTML = address;

        network.innerHTML = net.name + " (" + net.chainId + ")";

        balance.innerHTML = ethers.utils.formatEther(bal) + " ETH";

    } catch (err) {
        console.log(err);
        alert("Connection failed");
    }
}

async function switchNetwork() {

    try {

        await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [{ chainId: "0x4d5" }]
        });

    } catch (switchError) {

        if (switchError.code === 4902) {

            try {

                await ethereum.request({
                    method: "wallet_addEthereumChain",
                    params: [{
                        chainId: "0x4d5",
                        chainName: "AEREDIUM Testnet",
                        rpcUrls: ["https://testnet.rpc.aeredium.io"],
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

            } catch (addError) {
                console.log(addError);
            }

        } else {

            console.log(switchError);

        }

    }

}

  
      

          

                      
                       

           

    
  
       

  



          

   
     

 


