<script>
	import  { user, username } from '$lib/sessionStore';
	import { supabase } from '../lib/supabaseClient';
	import  { goto } from '$app/navigation';
	import { onMount } from 'svelte';
	import NewPost from './NewPost.svelte';

	let uname;

	user.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((state, session) => {
		if (state == 'SIGNED_IN') {
			user.set(session.user);
		} else {
			user.set(false);
		}
	});

	async function logout() {
		let { error } = await supabase.auth.signOut();
	}

  onMount(async() => {
    const { data, error } = await supabase
    .from("profiles")
    .select("username")
    .eq('id', $user?.id)
    console.log(data[0])
    uname = data[0].username
    username.set(uname)

  })

    
</script>

<div class="navbar bg-base-200">
	<div class="flex-1">
		<a class="btn btn-ghost normal-case text-4xl" href="/"
			><p class="text-blue-600">CG</p>
			<p class="text-blue-200">hcg</p></a
		>
	</div>
	<div class="flex-none">
		{#if $user}
    <NewPost />
  
			<a href="/profile"><p class="font-bold">{$username}</p> </a>
		{/if}

		<button
			class="btn ml-5  btn-ghost"
			on:click={$user ? logout : goto('http://localhost:5173/profile')}
		>
			{$user ? 'Logout' : 'Sign In'}
		</button>
	</div>
</div>


