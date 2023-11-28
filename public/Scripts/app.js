
(function() {
    function Start() {
        console.log("App Started");

        /*delete button warning*/

        let deleteButtons = document.querySelectorAll('.btn-danger');
        for (button of deleteButtons) {
            button.addEventListener('click', (event) => {
                if (!confirm("Are you sure you would like to delete?")) {
                    event.preventDefault();
                    window.location.assign('/exerciselist');
                }
            });
        }
    }
    window.addEventListener("load", Start);
})();
