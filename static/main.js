class Profile {
  constructor( {username, name: {firstName, lastName}, password} ) {
    this.username = username;
    this.name = {firstName, lastName};
    this.password = password;
  }

  addUser(callback) {
    console.log(`Adding user ${this.username}`);
    return ApiConnector.createUser(
      { username: this.username,
        name: this.name,
        password: this.password },
      (err,data) => {
        if (err) console.log(`Error during adding user ${this.username}`);
        else console.log(`Added user ${this.username}`);
        callback(err, data);
      });
  }

  authorization(callback) {
    console.log(`Authorization user ${this.username}`);
    return ApiConnector.performLogin(
      { username: this.username,
        password: this.password},
      (err, data) => {
        if (err) console.log(`Error during authorization user ${this.username}`);
        else console.log(`Authorized user ${this.username}`);
        callback(err, data);
      });
  }

  addMoney({ currency, amount }, callback) {
    console.log(`Adding ${amount} of ${currency} to ${this.username}`);
    return ApiConnector.addMoney(
      { currency: currency, amount: amount },
      (err, data) => {
        if (err) console.log(`Error during adding ${amount} of ${currency} to ${this.username}`);
        else console.log(`Added ${amount} of ${currency} to ${this.username}`);
        callback(err, data);
      });
  }

  convertMoney({ fromCurrency, targetCurrency, targetAmount}, callback) {
    console.log(`Converting ${fromCurrency} to ${targetAmount} of ${targetCurrency}`);
    return ApiConnector.convertMoney(
      { fromCurrency: fromCurrency, targetCurrency: targetCurrency, targetAmount: targetAmount },
      (err, data) => {
        if (err) console.log(`Error during converting ${fromCurrency} to ${targetAmount} of ${targetCurrency}`);
        else console.log(`Converted ${fromCurrency} to ${targetAmount} of ${targetCurrency}`);
        callback(err, data);
      });
  }

  transferMoney({ to, amount }, callback) {
    console.log(`Transfering ${amount} Netcoins from ${this.username} to ${to}`);
    return ApiConnector.transferMoney(
      { to: to, amount: amount },
      (err,data) => {
        if (err) console.log(`Error during transfering ${amount} Netcoins from ${this.username} to ${to}`);
        else console.log(`${to} has got ${amount} Netcoins from ${this.username}`);
        callback(err, data);
      });
  }
}

function getStocks(callback) {
  console.log(`Getting stocks`);
  return ApiConnector.getStocks(
    (err, data) => {
      console.log(`Stocks got`);
      callback(err, data);
    });
}

const stocks = getStocks( (err, data) => {
  //console.log(data)
} );

function main() {

  const user1 = new Profile({
    username: 'Vasec',
    name: {firstName: 'Vasiliy', lastName:'Pupkin'},
    password: 'vas95'
  });

  const user2 = new Profile({
    username: 'Petka',
    name: {firstName: 'Peter', lastName:'Petrov'},
    password: 'pet96'
  });

  user2.addUser( (err, data) => {
    if (err) console.log(err);
  });

  user1.addUser( (err, data) => {
    if (err) console.log(err);
    else
      user1.authorization( (err, data) => {
        if (err) console.log(err);
        else 
          user1.addMoney( {currency: 'EUR', amount: 50000}, (err,data) => {
            if (err) console.log(err);
            else
              user1.convertMoney( {fromCurrency: 'EUR', targetCurrency: 'NETCOIN', targetAmount: 100}, (err,data) => {
                if (err) console.log(err);
                else
                  user1.transferMoney( {to: 'Petka', amount: 36000}, (err,data) => {
                    if (err) console.log(err);      
                  });
              });
          });
      });
  });


}

main();