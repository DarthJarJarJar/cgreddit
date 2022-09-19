<script>
	import { supabase } from '../lib/supabaseClient';
	import { user } from '$lib/sessionStore';
	import { onMount } from 'svelte';

	let title;
	let content;
	let username;

	async function getUsername() {
		const { data, error } = supabase
			.from('profiles')
			.select('username')
			.eq('id', $user.id)
			.single();

		return data;
	}

	onMount(async () => {
        console.log($user)
		const { data, error } = await supabase.from('profiles').select('username').eq('id', $user.id)
        console.log(data)
		username = data[0].username;
	});

	async function post() {
		const { data, error } = await supabase
			.from('posts')
			.insert([{ 
            op: username,
            title: title,
            content: content
            }]);

		console.log(data);
        title = ""
        content = ""
	}
</script>

<label for="my-modal" class="btn modal-button mr-7">New Post</label>

<!-- Put this part before </body> tag -->
<input type="checkbox" id="my-modal" class="modal-toggle" />
<div class="modal">
	<div class="modal-box">
		<h3 class="font-bold text-lg">New Post</h3>
		<input
			type="text"
			placeholder="Title"
			class=" mt-4 mb-4 input input-bordered input-accent w-full max-w-xs"
            bind:value={title}
		/>
		<textarea class="textarea textarea-accent w-full" bind:value={content} placeholder="Post..." />

		<!-- <div class="modal-action">
      <label for="my-modal" class="btn" on:click={post}>Post</label>
    </div> -->
		<div class="grid place-items-center">
			<div class="flex">
				<div class="modal-action">
					<label for="my-modal" class="btn" on:click={post}>Post</label>
				</div>
				<div class="modal-action">
					<label for="my-modal" class="btn ml-5">Cancel</label>
				</div>
			</div>
		</div>
	</div>
</div>
