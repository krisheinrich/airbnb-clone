<script context="module">
  export async function preload({ params, query }) {
    const res = await this.fetch(`houses/${params.id}.json`);
    const data = await res.json();

    if (res.status === 200) {
      return { house: data };
    } else {
      this.error(res.status, data.message);
    }
  }
</script>

<script>
  import DateRangePicker from './_DateRangePicker.svelte';
  import { getNightsBetweenDates } from '../../util/date';
  import { showModal, showLoginModal } from '../../store';

  export let house;

  let startDate;
  let endDate;
  let dateChosen = false;
  let numNightsBetweenDates = 0;

  const changeDates = e => {
    startDate = e.detail.startDate;
    endDate = e.detail.endDate;
    numNightsBetweenDates = getNightsBetweenDates(startDate, endDate);
    dateChosen = true;
  };

  const onReserveClick = () => {
    showModal.set(true);
    showLoginModal.set(true);
  };
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: 60% 40%;
    grid-gap: 30px;
  }

  aside {
    border: 1px solid #ccc;
    padding: 20px;
    margin-top: 20px;
  }
</style>

<svelte:head>
  <title>{house.title}</title>
</svelte:head>

<div>
  <header>
    <img src="{house.picture}" width="100%" alt="">
  </header>

  <div class="container">
    <main>
      <h1>{house.title}</h1>
      <h2>{house.town}</h2>
      <p><strong>{house.type}</strong></p>
      <p>{house.guests} guests - {house.bedrooms} bedrooms - {house.beds} beds - {house.baths} baths</p>

      {#if house.superhost === true}
        <p><strong>{house.hostName} is a Superhost</strong></p>
        <p>Superhosts are experienced, highly rated hosts who are committed to providing great stays for guests.</p>
      {/if}

      <p>{@html house.description}</p>

      <button>Contact Host</button>

      <hr />

      {#if (house.wifi || house.kitchen || house.heating || house.freeParking)}
        <h3>Amenities</h3>

        <ul>
        {#if house.wifi} <li>Wi-Fi</li> {/if}
        {#if house.kitchen} <li>Kitchen</li> {/if}
        {#if house.heating} <li>Heating</li> {/if}
        {#if house.freeParking} <li>Free Parking</li> {/if}
        </ul>
      {/if}

      {#if house.entirePlace === true}
        <p><strong>Entire Place</strong></p>
        <p>You’ll have the space to yourself and will only share it with those you’re traveling with.</p>
      {/if}

      {#if house.reviewsCount}
        <h3>{house.reviewsCount} {house.reviewsCount === 1 ? 'Review' : 'Reviews'}</h3>
        {#each house.reviews as review}
          <p>{review.userName} - {new Date(review.createdAt).toDateString()}</p>
          <p>{review.comment}</p>
        {/each}
      {/if}
    </main>

    <aside>
      <h2>Add dates for prices</h2>
      <DateRangePicker on:datesChanged={changeDates}/>

      {#if dateChosen}
        <br>
        <h2>Price for Stay</h2>
        <p>{house.price} x {numNightsBetweenDates}</p>
        <p><strong>Total</strong> ${house.price * numNightsBetweenDates}</p>
        <button class="button" on:click={onReserveClick}>Reserve</button>
      {/if}
    </aside>
  </div>
</div>
