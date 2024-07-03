(function(){
    var DatePicker = {
        interval: false,
        init: function(){
            $( document ).on( 'click', '#selectedDateTime', function(){
                $('#pickerContainer').toggleClass('hidden');
            });

            $( document ).on( 'change', '#datePicker, #timePicker', function(){
                DatePicker.updateSelectedDateTime();
            });

            this.interval = setInterval(function(){
                DatePicker.updateMinutes(); // Update only minutes every minute
                DatePicker.updateSelectedDateTime();
            }, 60000); // Update every minute

            this.updateDate();
            this.updateTime(); // Initialize time picker initially

            // Restore selected date and time if previously stored
            var storedDateTime = $('#storedDateTime').text().trim();
            if (storedDateTime !== '') {
                var dateTimeParts = storedDateTime.split(' ');
                $('#selectedDate').text(dateTimeParts[0]);
                $('#selectedTime').text(dateTimeParts[1]);

                // Hide placeholder text 'None'
                $('#selectedDate, #selectedTime').removeClass('hidden');
            }
        },
        updateDate: function(){
            // This function can be expanded if you want to dynamically update date options in the future
        },
        updateTime: function(){
            var $timePicker = $('#timePicker');
            $timePicker.empty();

            var currentTime = new Date();
            var hours = currentTime.getHours(); // Get current hours
            var minutes = currentTime.getMinutes();

            for (var i = 0; i < 24; i++) {
                var hour = i < 10 ? '0' + i : i;
                var time = hour + ':' + (minutes < 10 ? '0' + minutes : minutes);
                $timePicker.append($('<option></option>').val(time).text(time));
            }
        },
        updateMinutes: function(){
            var $timePicker = $('#timePicker');
            var currentTime = new Date();
            var minutes = currentTime.getMinutes();

            $timePicker.find('option').each(function() {
                var oldTime = $(this).val();
                var hour = oldTime.split(':')[0];
                var newTime = hour + ':' + (minutes < 10 ? '0' + minutes : minutes);
                $(this).val(newTime).text(newTime);
            });
        },
        updateSelectedDateTime: function(){
            var selectedDate = $('#datePicker').val();
            var selectedTime = $('#timePicker').val();

            $('#selectedDate').text(selectedDate);
            $('#selectedTime').text(selectedTime);

            // Store selected date and time in the hidden paragraph
            var storedDateTime = selectedDate + ' ' + selectedTime;
            $('#storedDateTime').text(storedDateTime);

            $('#pickerContainer').addClass('hidden');

        
            $('#selectedDate, #selectedTime').removeClass('hidden');
        }
    };

    $(document).ready(function(){
        DatePicker.init();
    });
})();

