<script>
    export let title;
    export let content;
    export let op;
</script>

<div class="container w-full border-white border-solid m-8">
    <p class="font-bold text-2xl m-4 mb-0">{title}</p>
    <p class="text-sm m-4 mt-0 ">{op}</p>
    <p class="text-md m-4">{content}</p>
</div>

<style>
    .container {
        border: 0.5px solid gray;
        border-radius: 1rem;
    }
</style>