
//find a user with the id of "id", when u get him, fire the callback
//we are using synchronous, note, we would have easily return the user.
var getUser = (id, callback) => {
    var user = {
        id: id,
        name: 'Agu'
    };
    //send that object we have
    // callback(user);

    //setting a delay
    setTimeout(() => {
        callback(user);
    }, 3000)
}

getUser(31, (userObj) => {
    console.log(userObj);
});