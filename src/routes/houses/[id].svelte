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

      <h3>Amenities</h3>

      <ul>
      {#each Object.keys(house.amenities) as amenity}
        <li>{amenity}</li>
      {/each}
      </ul>

      {#if house.entirePlace === true}
        <p><strong>Entire Place</strong></p>
        <p>You’ll have the space to yourself and will only share it with those you’re traveling with.</p>
      {/if}

      <h3>{house.rating} ({house.reviewsCount} Reviews)</h3>

      {#each house.reviews as review}
        <img src={review.avatar} alt="" />
        <p><strong>{review.user}</strong></p>
        <p>{review.date}</p>
        <p>{review.comment}</p>
      {/each}
    </main>

    <aside>
      <h2>Add dates for prices</h2>
      <DateRangePicker on:datesChanged={changeDates}/>

      {#if dateChosen}
        <br>
        <h2>Price for Stay</h2>
        <p>{house.price} x {numNightsBetweenDates}</p>
        <p><strong>Total</strong> ${house.price * numNightsBetweenDates}</p>
        <button class="reserve">Reserve</button>
      {/if}
    </aside>
  </div>
</div>
