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
  import axios from 'axios';
  import { stores } from '@sapper/app';
  import { onMount } from 'svelte';

  const { session } = stores();

  export let house;

  let startDate;
  let endDate;
  let dateChosen = false;
  let numNightsBetweenDates = 0;
  let bookedDates = null;

  onMount(async () => {
    bookedDates = await getBookedDates();
  });

  const changeDates = e => {
    startDate = e.detail.startDate;
    endDate = e.detail.endDate;
    numNightsBetweenDates = getNightsBetweenDates(startDate, endDate);
    dateChosen = true;
  };

  const promptLogin = () => {
    showModal.set(true);
    showLoginModal.set(true);
  };

  const getBookedDates = async () => {
    try {
      const houseId = house.id;
      const response = await axios.post('/houses/booked', { houseId });
      if (response.data.status === 'error') {
        // TO DO: replace with toast
        alert(response.data.message);
        return;
      }
      return response.data.dates;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const canReserve = async () => {
    try {
      const houseId = house.id;
      const response = await axios.post('houses/check', { houseId, startDate, endDate });
      if (response.data.status === 'error') {
        alert(response.data.messge);
        return;
      }

      if (response.data.message === 'busy') {
        return false;
      }

      return true;
    } catch (error) {
      console.error(error);
      return;
    }
  };

  const reserve = async () => {
    try {
      if (!await canReserve()) {
        alert('The dates chosen are not valid');
        return;
      }

      const houseId = house.id;
      const response = await axios.post('houses/reserve', { houseId, startDate, endDate });
      if (response.data.status === 'error') {
        // TO DO: Replace alert() calls with toasts
        alert(response.data.message);
        return;
      }
      console.log(response.data);
    } catch (error) {
      console.error(error);
      return;
    }
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
      <DateRangePicker on:datesChanged={changeDates} {bookedDates}/>

      {#if dateChosen}
        <br>
        <h2>Price for Stay</h2>
        <p>{house.price} x {numNightsBetweenDates} {numNightsBetweenDates === 1 ? 'night' : 'nights'}</p>
        <p><strong>Total</strong> ${house.price * numNightsBetweenDates}</p>

        {#if $session.user}
          <button class="button" on:click={reserve}>Reserve</button>
        {:else}
          <button class="button" on:click={promptLogin}>Login to Reserve</button>
        {/if}
      {/if}
    </aside>
  </div>
</div>
