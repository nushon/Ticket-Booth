let url = '/all_events';
fetch(url).then(response => response.json())
.then((data) => {
    // console.log(data.data.rows);
    let mydata = data.data.rows;
    console.log("Data landing page", mydata);

    })
    .catch(err => {
        console.log(err);
    })