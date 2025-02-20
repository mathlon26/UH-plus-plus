const output = document.getElementById("output");

function print(data) {
    output.innerText = data;
}


(() => {
    print();
})();


