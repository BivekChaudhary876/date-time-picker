<?php
date_default_timezone_set( 'Asia/Kathmandu' );

function generateDate( $startDaysAhead, $numDays ) {
    $options = '';
    $currentDate = new DateTime();
    $currentDate->modify( "+$startDaysAhead days" );

    for ( $i = 0; $i < $numDays; $i++ ) {
        $dayOfWeek = $currentDate->format( 'D' );
        $optionValue = $currentDate->format( 'Y-m-d' );
        $currentDayMonth = $currentDate->format( 'j F' );
        $optionText = ( $i + $startDaysAhead ) . ' days (' . $dayOfWeek . ') '. $currentDayMonth;
        $options .= "<option value='$optionValue'>$optionText</option>";
        $currentDate->modify( '+1 day' );
    }

    return $options;
}

function generateTime() {
    $options = '';
    $currentMinute = ( int )date( 'i' );

    for ( $i = 0; $i < 24; $i++ ) {
        $hour = str_pad( $i, 2, "0", STR_PAD_LEFT );
        $time = $hour . ':' . str_pad( $currentMinute, 2, "0", STR_PAD_LEFT );
        $options .= "<option value='$time'>$time</option>";
    }

    return $options;
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./style.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <script src="./index.js"></script>
    <title>Date and Time Picker</title>
    <style>
        .hidden {
            display: none;
        }
    </style>
</head>
<body>
    <div class="container">
        <div id="selectedDateTime">
            Selected Date and Time: 
            <span id="selectedDateTimeSpan" style="display: none;"></span>
            <span id="selectedDate">None</span> 
            <span id="selectedTime">None</span>
        </div>
        <div class="tab-content hidden" id="pickerContainer">
            <select id="datePicker">
                <?php echo generateDate( 3, 12 ); ?>
            </select>
            <select id="timePicker">
                <?php echo generateTime(); ?>
            </select>
        </div>
        <p id="storedDateTime" class="hiddehfgn"></p>
    </div>
</body>
</html>
