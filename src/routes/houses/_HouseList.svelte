<script>
  import House from './_House.svelte';
  import houses from './_houses';
</script>

<style>
  .houses {
    display: grid;
    grid-template-columns: repeat(3, 400px);
    grid-template-rows: repeat(2, 300px);
    grid-gap: 40px;
  }
</style>

<div>
  <h2>Places to Stay</h2>

  <div class="houses">
  {#each houses as house}
    <House {...house} />
  {/each}
  </div>
</div>