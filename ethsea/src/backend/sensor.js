
const { Web3 } = require('web3');


// Create a new Ethereum account
function createNewAccount() {
    const newAccount = web3.eth.accounts.create();
    console.log('New Account Address:', newAccount.address);
    console.log('Private Key:', newAccount.privateKey);
    return newAccount;
}





const web3 = new Web3('http://localhost:8545'); // Connect to your local node

const contractABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "string",
        "name": "pid",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "be",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "bet",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "k_m",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "k_p",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "k_h",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "string",
        "name": "l",
        "type": "string"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "ts",
        "type": "uint256"
      }
    ],
    "name": "Write",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_element",
        "type": "address"
      }
    ],
    "name": "addAddr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_element",
        "type": "address"
      }
    ],
    "name": "contains",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_index",
        "type": "uint256"
      }
    ],
    "name": "get",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAll",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_element",
        "type": "address"
      }
    ],
    "name": "removeAddr",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "size",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "pid",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "be",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "bet",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "k_m",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "k_p",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "k_h",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "l",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "ts",
        "type": "uint256"
      }
    ],
    "name": "write",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  }
];
const contractAddress = '0x4a679253410272dd5232b3ff7cf5dbb88f295319'; // Replace with your contract's address

const contract = new web3.eth.Contract(contractABI, contractAddress);


const fs = require('fs-extra');
const path = require('path');


// File path to store the keypair
const filePath = path.join(__dirname, 'keypair.txt');

// Function to generate a new keypair
const generateKeypair = () => {
    const account = web3.eth.accounts.create();
    return {
        publicKey: account.address,
        privateKey: account.privateKey
    };
};

// Function to check if the file contains a valid keypair
const checkAndGenerateKeypair = async () => {
    try {
        // Check if the file exists
        const exists = await fs.pathExists(filePath);

        if (exists) {
            // Read the file content
            const fileContent = await fs.readFile(filePath, 'utf8');

            // Check if the content is in the expected format
            const keys = fileContent.split(',');
            if (keys.length === 2 && web3.utils.isAddress(keys[0]) && keys[1].startsWith('0x')) {
                console.log('Keypair already exists:', keys);
                return keys; // Return the existing public key
            }
        }

        // Generate a new keypair if the file does not exist or does not contain a valid keypair
        const { publicKey, privateKey } = generateKeypair();
        const keypairString = `${publicKey},${privateKey}`;

        // Write the keypair to the file
        await fs.writeFile(filePath, keypairString, 'utf8');
        console.log('Generated and saved new keypair:', keypairString);
        return [publicKey, privateKey]; // Return the new public key
    } catch (error) {
        console.error('Error processing the keypair file:', error);
    }
};

// Execute the function and store the public key in a variable
const getKeyPair = async () => {
    const keyPair = await checkAndGenerateKeypair();
    console.log('Public Key:', keyPair[0]);
    // You can use the publicKey variable as needed
    return keyPair;
};


// Async function to call getPublicKey and use the result
//this data will be written by a sensor.
const main = async () => {
  const keyPair = await getKeyPair();
  pid = '2';
  be = 'wholesale SDN BHD';
  bet = 'wholesaler';
  k_m = 4;
  k_p = 5;
  k_h = 4;
  l = '4.9, 91.68980161366966';
  callWriteFunction(keyPair, pid, be, bet, k_m, k_p, k_h, l);
};

main();




async function callWriteFunction(keyPair, pid, be, bet, k_m, k_p, k_h, l) {

    const ts = Math.floor(Date.now() / 1000); // Current Unix timestamp

    const contract = new web3.eth.Contract(contractABI, contractAddress);


        const gasprice = await web3.eth.getGasPrice();
        
        // Convert gas price from Wei to Gwei for readability
        const gasPriceInGwei = web3.utils.fromWei(gasprice, 'gwei');
        
        console.log(`Current Gas Price: ${gasprice} Wei (${gasPriceInGwei} Gwei)`);


        const maxPriorityFeePerGas = web3.utils.toWei('2', 'gwei'); // Example priority fee
        const maxFeePerGas = web3.utils.toWei('10', 'gwei'); // Example max fee
    

const richAccPrivate = "0xac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";

      const accounts = await web3.eth.getAccounts();
      richAcc = accounts[0];
      

    try {
      const data = contract.methods.write(pid, be, bet, k_m, k_p, k_h, l, ts).encodeABI();

      const tx = {
        from: richAcc,
        to: contractAddress,
        data: data,
        gas: 2000000, //Current Gas Price: 1875000000 Wei (1.875 Gwei)
        maxPriorityFeePerGas: maxPriorityFeePerGas,
        maxFeePerGas: maxFeePerGas,
        value: web3.utils.toWei('0.00000001', 'ether'), // 10 gwei

    };
  
    const signedTx = await web3.eth.accounts.signTransaction(tx, richAccPrivate);
  
    web3.eth.sendSignedTransaction(signedTx.rawTransaction)
        .on('receipt', console.log)
        .on('error', console.error);
      
      } catch (error) {
        console.error('Error calling write function:', error);
    }


}
