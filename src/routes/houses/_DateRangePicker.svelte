<script>
  import Datepicker from '../../lib/svelte-calendar-1.0.10/src/Components/Datepicker.svelte';
  import * as dateUtil from '../../util/date';

  const dateFormat = '#{l}, #{F} #{j}, #{Y}';

  const startDateSelectableCallback = date => {
    return true;
  };

  let endDateSelectableCallback = date => {
    const today = new Date();

    // restrict dates in the past
    if (date.getTime() < startDate.getTime()) {
      return false;
    }

    // restrict today
    if (dateUtil.isSameDate(date, today)) {
      return false;
    }

    // restrict start date
    if (dateUtil.isSameDate(date, startDate)) {
      return false;
    }

    return true;
  };

  const selectStartDate = e => {
    startDate = new Date(e.detail.date);
    // update end date restrictions
    endDateSelectableCallback = endDateSelectableCallback;

    if (!dateUtil.firstDatePrecedesSecond(startDate, endDate)) {
      endDate = dateUtil.getDefaultEndDate(startDate);
    }
  };

  let startDate = new Date();
  let endDate = dateUtil.getDefaultEndDate(startDate);

  export let togglePicker;
</script>

<style>
  .date-range-picker-container {
    border: 1px solid #ddd;
    display: grid;
    grid-template-columns: 40% 20% 40%;
    padding: 10px;
  }
</style>

<div class="date-range-picker-container">
  <Datepicker
    format='{dateFormat}'
    start={new Date()}
    selectableCallback={startDateSelectableCallback}
    on:dateSelected={selectStartDate}>
    <div class="check-in" on:click={togglePicker}>
      {`${startDate.getDate()} ${startDate.toLocaleString('default', { month: 'long' })}`}
    </div>
  </Datepicker>
  <div class="arrow">➡️</div>
  <Datepicker
    format='{dateFormat}'
    start={new Date()}
    selectableCallback={endDateSelectableCallback}
    on:dateSelected={e => { endDate = new Date(e.detail.date) }}>
    <div class="check-in">
      {`${endDate.getDate()} ${endDate.toLocaleString('default', { month: 'long' })}`}
    </div>
  </Datepicker>
</div>
