$(document).ready(function () {
    $("#textForm").submit(function (e) {
        e.preventDefault();
        const userMessage = $("#text").val().trim();
        if (userMessage === "") return;

        // Append user message to chat window
        $("#messageContainer").append(`<div class="user-message">${userMessage}</div>`);
        $("#text").val(""); // Clear input field

        // Show typing indicator
        $("#messageContainer").append(`<div class="typing-indicator"><span></span><span></span><span></span></div>`);

        // Simulate bot response delay
        setTimeout(function () {
            $(".typing-indicator").remove(); // Remove typing indicator

            // Send request to Flask backend
            $.ajax({
                type: "POST",
                url: "/get_text_response",
                contentType: "application/json",
                data: JSON.stringify({ message: userMessage }),
                success: function (response) {
                    $("#messageContainer").append(`<div class="bot-message">${response.response}</div>`);
                },
                error: function () {
                    $("#messageContainer").append(`<div class="bot-message">Error processing your request.</div>`);
                }
            });
        }, 1000);
    });
});
