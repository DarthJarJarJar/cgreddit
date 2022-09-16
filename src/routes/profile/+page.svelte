<script>
	import Auth from '$lib/Auth.svelte';
	import { supabase } from '../../lib/supabaseClient';
	import { user } from '$lib/sessionStore';
	import { onMount } from 'svelte';

	let signedIn;

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
</script>

{#if !$user}
	<Auth />
{:else}
	<button class="btn m-5" on:click={logout}>Sign out</button>
{/if}
