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
      (err,data) => callback(err, data) );
  }

  authorization(callback) {
    console.log(`Authorizating user ${this.username}`);
    return ApiConnector.performLogin(
      { username: this.username,
        password: this.password},
      (err, data) => callback(err, data) );
  }

  addMoney({ currency, amount }, callback) {
    console.log(`Adding ${amount} of ${currency} to ${this.username}`);
    return ApiConnector.addMoney(
      { currency: currency, amount: amount },
      (err, data) => callback(err, data) );
  }

  convertMoney({ fromCurrency, targetCurrency, targetAmount}, callback) {
    console.log(`Converting ${fromCurrency} to ${targetAmount} of ${targetCurrency}`);
    return ApiConnector.convertMoney(
      { fromCurrency: fromCurrency, targetCurrency: targetCurrency, targetAmount: targetAmount },
      (err, data) => callback(err, data) );
  }

  transferMoney({ to, amount }, callback) {
    console.log(`Transfering ${amount} NETCOINS from ${this.username} to ${to}`);
    return ApiConnector.transferMoney(
      { to: to, amount: amount },
      (err,data) => callback(err, data) );
  }
}

function getStocks(callback) {
  console.log(`Getting stocks`);
  return ApiConnector.getStocks(
    (err, data) => callback(err, data) );
}

const stocks = getStocks( (err, data) => {
  if (err) {
      console.log(`Error during getting stoks`);
      console.log(err);
  }
  //else console.log(data);
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
    if (err){
      if (err.code === 409) console.log(`User ${user2.username} already exists`); // выполняется, если пользователь уже создан
      else {
        console.log(`Error during adding user ${user2.username}`); // пишем, что произошла ошибка добавления пользователя
        console.log(err);                                         // выводим текст ошибки
      }
    }
  });

  user1.addUser( (err, data) => {
    if (err){
      if (err.code === 409) console.log(`User ${user1.username} already exists`); // выполняется, если пользователь уже создан
      else {
        console.log(`Error during adding user ${user1.username}`); // пишем, что произошла ошибка добавления пользователя
        console.log(err);                                         // выводим текст ошибки
      }
    }
    if (!err || err.code === 409) { // если код ошибки 409 (пользователь уже создан), разрешаем дальнейшее выполнение без перезапуска сервера
      if (!err) console.log(`Added user ${user1.username}`);

      user1.authorization( (err, data) => {
        if (err) {
          console.log(`Error during authorizating user ${user1.username}`);
          console.log(err);
        }
        else {
          console.log(`Authorized user ${user1.username}`);

          addCurrency = 'RUB';
          addAmount = 500000;
          user1.addMoney( {currency: addCurrency, amount: addAmount}, (err,data) => {
            if (err) {
              console.log(`Error during adding ${addAmount} of ${addCurrency} to ${user1.username}`);
              console.log(err);
            }
            else {
              console.log(`Added ${addAmount} of ${addCurrency} to ${user1.username}`);

              convertFromCurrency = 'RUB';
              convertTargetCurrency = 'NETCOIN';
              convertTargetAmount = 100;
              user1.convertMoney( {fromCurrency: convertFromCurrency, targetCurrency: convertTargetCurrency, targetAmount: convertTargetAmount}, (err,data) => {
                if (err) {
                  console.log(`Error during converting ${convertFromCurrency} to ${convertTargetAmount} of ${convertTargetCurrency}`);
                  console.log(err);
                }
                else {
                  console.log(`Converted ${convertFromCurrency} to ${convertTargetAmount} of ${convertTargetCurrency}`);

                  transferTo = 'Petka';
                  transferAmount = 50;
                  user1.transferMoney( {to: transferTo, amount: transferAmount}, (err,data) => {
                    if (err) {
                      console.log(`Error during transfering ${transferAmount} NETCOINS from ${user1.username} to ${transferTo}`);
                      console.log(err);
                    }
                    else console.log(`Transfered ${transferAmount} NETCOINS from ${user1.username} to ${transferTo}`);
                  });
                }
              });
            }
          });
        }
      });
    }
  });


}

main();