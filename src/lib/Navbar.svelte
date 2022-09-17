<script>
  import { user } from '$lib/sessionStore'
  import { supabase } from '../lib/supabaseClient'
  import { goto } from '$app/navigation'

  let username;

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
<div class="navbar bg-base-200">
    <div class="flex-1">
      <a class="btn btn-ghost normal-case text-4xl" href="/"><p class="text-blue-600">CG</p><p class="text-blue-200">reddit</p></a>
    </div>
    <div class="flex-none">
      {#if $user}
      <button class="btn mr-5 btn-ghost font-bold " href="/profile">
             New Post
        </button>
        <a href="/profile"><p class="font-bold">{$user.user_metadata.full_name}</p>
        </a>
      {/if}

     
            <button class="btn ml-5  btn-ghost text-white" 
            on:click={$user ? logout : goto('http://localhost:5173/profile')}>
             {$user ? 'Logout' : 'Sign In'}
              </button>
  

      
    </div>
</div>

<style>
  btn {
    text-transform: none;
  }
</style>
  