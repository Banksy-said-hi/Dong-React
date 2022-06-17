# Decentralized bill splitting application - DONG

This platfrom is empowered by Solidity smart contracts, Ethers.js, Hardhat, and React.js.

It has meant to help a group of people who want to do an activity together with dividing the entire bill into equal shares that need to be paid by whoever wants to accompany the group in the scheduled event. 

Basically, users can interact with this platform in main two ways:

1- Creation: they can create a customized smart contract for a specific reason, capable of accepting funds from members and keeping track of the procedure of gathering money. Contract creation must be done by a user selected from the group. 4 attributes must be specified while creating a new smart contract:

  a) Beneficiary Address: wallet address/public ID of the admin who will consume the accumulated money later, or the owner of the facility the intend to use
  
  b) Beneficiary Name: Name of the admin or the owner
  
  c) Amount: The total amount of money ( in ETH ) that is estimated to be spent 
  
  d) Number of Contributors: Total number of people who will attend this event
  
  
  
2- Payment: Once a smart contract is created by an admin according to a particular situation, address of the generated contract must be shared with the members letting them to load that specific contract and pay their calculated share after navigating to the payment page. Each user who intends to pay a share has to provide a name ( string ) while paying the amount, allowing the contarct record names of the users who have paid their share. Whenever data is refreshed, name of the contributors will be printed within the console.


Hope you enjoy!
