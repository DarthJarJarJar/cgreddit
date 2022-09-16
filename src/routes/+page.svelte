<script>
  import { user } from '$lib/sessionStore'
  import { supabase } from '../lib/supabaseClient'
	import { onMount } from 'svelte';

  let content;
  let loading = true

  user.set(supabase.auth.user());
	supabase.auth.onAuthStateChange((state, session) => {
		if (state == 'SIGNED_IN') {
			user.set(session.user);
		} else {
			user.set(false);
		}
	});

  function getInfo() {
    console.log(supabase.auth.user())
  }

  async function add() {
  const { data, error } = await supabase
  .from('testlist')
  .insert([{ content: content}])
  if (error) throw error
  content = ""
  }

  function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    arr.splice(index, 1);
  }
  datalist = arr
  return arr;
}

function removeFromDataList(id) {
  let count = 0
  for (let item of datalist) {
    if(item.id==id) {
      datalist.splice(count, 1)
    }
    count++
  }
  datalist=datalist
  
}

  const mySubscription = supabase
  .from('testlist')
  .on('*', (payload) => {
    console.log('Change received!', payload)
    if (payload.eventType === "INSERT") {
      datalist = [...datalist, payload.new]
    } 
    if (payload.eventType === "DELETE") {
      console.log(datalist.indexOf(payload.old))
      removeFromDataList(payload.old.id)
      console.log(datalist)
      datalist = datalist
    }
    
  })
  .subscribe()

  mySubscription.socket.onMessage(message => {
    console.log('MESSAGE', message)
    if (message.event === 'system' && message.payload.message === 'Subscribed to Realtime') {
        console.log('OK now we are really subscribed')
        loading = false
    }
})

  async function del(id) {
    const { data, error } = await supabase
  .from('testlist')
  .delete()
  .match({ id: id })
  }


  let datalist;
  onMount(async() => {
    const { data, error } = await supabase.from('testlist').select()
    console.log(data)
    datalist = data
  })

</script>

<h1>{$user}</h1>
{#if $user}
  <h1>{$user.user_metadata.full_name}</h1>
  <div class="flex">
    <input type="text" bind:value={content} placeholder="Type here" class="input input-bordered input-primary w-full max-w-xs" />
<button class="btn ml-4" on:click={add} disabled={loading}>Add</button>
  </div>

{/if}
<button class="btn" on:click={getInfo}>
info
</button>
{#if datalist}
{#each datalist as data}
  <div class="flex">
    <p class="m-5">{data.content}</p>
    <button class="btn bg-red-800 m-5" disabled={loading} on:click={()=>del(data.id)}>delete</button>
  </div>

{/each}
{/if}
