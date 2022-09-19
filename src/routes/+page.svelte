<script>
  import { user } from '$lib/sessionStore'
  import { supabase } from '../lib/supabaseClient'
  import  Post  from '$lib/Post.svelte'
	import { onMount } from 'svelte';
	import Page from './createprofile/+page.svelte';


  let content;
  let loading = true
  let username;

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
  .from('posts')
  .on('*', (payload) => {
    console.log('Change received!', payload)
    if (payload.eventType === "INSERT") {
      //datalist = [...datalist, payload.new]
      datalist.unshift(payload.new)
      datalist = datalist
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
    const { data, error } = await supabase
    .from('posts')
    .select(`
    title,
    content,
    op,
    profiles (
      username
    )
  `)
    .order('created_at', { ascending: false})
    console.log("idvoweino")
    console.log(data)
    datalist = data


  })

</script>

<div class="grid place-items-center a">

  {#if datalist}
  {#each datalist as data}
    <Post title={data.title} content={data.content} op={data.op}></Post>
  {/each}
  {/if}
</div>

<style>
  .a {
    margin-left: auto;
    margin-right: auto;
    width: 70vw;
    margin-top: 4rem;
  }
</style>
