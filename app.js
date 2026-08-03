const button = document.getElementById("connectButton");

button.onclick = async () => {

    if (!window.ethereum) {
        alert("Please install MetaMask");
        return;
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await provider.send("eth_requestAccounts", []);

    const signer = provider.getSigner();

    const address = await signer.getAddress();

    const balance = await provider.getBalance(address);

    const network = await provider.getNetwork();

    document.getElementById("walletAddress").innerHTML = address;

    document.getElementById("walletBalance").innerHTML =
        Number(ethers.utils.formatEther(balance)).toFixed(4) + " ETH";

    document.getElementById("networkName").innerHTML =
        network.name + " (" + network.chainId + ")";
};
