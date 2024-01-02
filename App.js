$(document).ready(function() {
    $('.pricing-button').click(function() {
      $('#orderModal').modal('show');
    });

    $('#userSlider').on('input', function() {
        var userCount = parseInt($(this).val());
        $('#userCount').text(userCount);
    
        // Determine which plan to highlight based on user count
        $('.plan').removeClass('custom-highlight'); // Remove highlighting from all plans
        if (userCount >= 0 && userCount < 10) {
            $('.plan:eq(0)').addClass('custom-highlight'); // Highlight the first plan
        } else if (userCount >= 10 && userCount < 20) {
            $('.plan:eq(1)').addClass('custom-highlight'); // Highlight the second plan
        } else if (userCount >= 20 ) {
            $('.plan:eq(2)').addClass('custom-highlight'); // Highlight the third plan, and so on
        }
    });
});

let isLoading = false;
        let page = 1;
        
        function truncateTitle(title) {
            return title.substring(0, 5);
        }

        function loadMorePlans() {
            if (isLoading) return;

            isLoading = true;
           
            // Simulate loading more plans from an API
            fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page}&_limit=5`)
                .then((response) => response.json())
                .then((data) => {
                    if (data.length === 0) {
                        // No more plans to load
                        alert("No more plans to load.");
                    } else {
                        // Append the loaded plans to the container
                        
                        data.forEach((plan) => {
                            const truncatedTitle = truncateTitle(plan.title);
                            const planElement = `
                                <div class="col-md-4 plan">
                                    <div class="card mb-4 shadow-sm">
                                        <div class="card-header">
                                            <h5 class="my-0 font-weight-normal">${truncatedTitle}</h5>
                                        </div>
                                        <div class="card-body">
                                            <h1 class="card-title pricing-card-title">${plan.id}</h1>
                                            <ul class="list-unstyled mt-3 mb-4">
                                                <li>${plan.body}</li>
                                            </ul>
                                            <button type="button" class="btn btn-lg btn-block btn-outline-primary" data-toggle="modal" data-target="#orderModal">Sign up</button>
                                        </div>
                                    </div>
                                </div>
                            `;
                            $('.row').append(planElement);
                        });

                        // Increment the page number for the next load
                        page++;
                    }

                    isLoading = false;
                })
                .catch((error) => {
                    console.error("Error fetching data:", error);
                    isLoading = false;
                });
        }

        window.addEventListener("scroll", () => {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollTop = window.scrollY;

            if (windowHeight + scrollTop >= documentHeight - 200) {
                loadMorePlans(); // Trigger loading when close to the bottom
            }
        });

        // Initial load when the page loads
        window.addEventListener("load", () => {
            loadMorePlans();
        });
       
