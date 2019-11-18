<script>
  import { onMount } from 'svelte';

  export let bookings;

  let loading = true;

  onMount(async () => {
    const res = await fetch('bookings/list.json');
    if (res.status === 200) {
      bookings = await res.json();
      loading = false;
    } else {
      console.error(res.status, data.message);
    }
  });
</script>

<style>
  h1 { padding-bottom: 30px; }

  .bookings {
    display: grid;
    grid-template-columns: 100%;
    grid-gap: 40px;
  }

  .booking {
    display: grid;
    grid-template-columns: 30% 70%;
    grid-gap: 40px;
  }

  .booking img { width: 100%; }
</style>

<svelte:head>
  <title>Your Bookings</title>
</svelte:head>

<div>
  {#if !loading}
    {#if !bookings}
      <h1>No Bookings Yet</h1>
    {:else}
      <h1>Your Upcoming Bookings</h1>
      <div class="bookings">
        {#each bookings as { booking, house } }
          <div class="booking">
            <img src="{house.picture}" alt="House picture"/>
            <div>
              <h2>{house.title} in {house.town}</h2>
              <p>Booked from {new Date(booking.startDate).toDateString()} to {new Date(booking.endDate).toDateString()}</p>
              <p><a href="/houses/{house.id}">Go to house details</a></p>
            </div>
          </div>
        {/each}
      </div>
    {/if}
  {/if}
</div>
