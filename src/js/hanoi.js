window.addEventListener('load', function(e){

const sleep = delay => new Promise(resolve => setTimeout(resolve, delay));


  //--- STACK & QUEUE ---//
  class Stack {
    constructor(_num, set_stack=[]) {
      this._arr = set_stack;
      this.num = _num;
    }
    push(item) {
      this._arr.push(item);
    }
    pop() {
      return this._arr.pop();
    }
    peek() {
      return this._arr[this._arr.length - 1];
    }
    size() {
      return this._arr.length;
    }
    all_arr(){
      return this._arr;
    }
  }
  class Queue {
    constructor(set_list=[]) {
      this._arr = set_list;
    }
    offer(item) {
      this._arr.push(item);
    }
    poll() {
      return this._arr.shift();
    }
    peek(){
      return this._arr[0];
    }
    get(index){
      return this._arr[index];
    }
    size() {
      return this._arr.length;
    }
  }


  //--- HANOI_TOWER CLASS ---//
  class Hanoi_Tower {
    constructor(_ring){
      this.A_tower = new Stack(1);
      this.B_tower = new Stack(2);
      this.C_tower = new Stack(3);
      this.count = 1;
      this.ring = _ring;
      this.tower;
      this.odd = new Queue();
      this.even = new Queue();
      this.name = new Queue(["A", "B", "C"]);
      this.loop;
      this.input_ring = document.querySelector(`#input_ring`);
      this.btn_start = document.querySelector(`#btn_start`);
      this.btn_reset = document.querySelector(`#btn_reset`);
      this.btn_close = document.querySelector(`#btn_close`);
      this.read_count = document.querySelector(`#read_count`);
      this.pop_up = document.querySelector(`.popup_complete`);
      this.box_tower = $(`main>section`);
      this.ring_width = ['10%', '20%', '30%', '40%', '50%', '60%', '70%', '80%', '90%', '100%'];
      this.ring_color = ['#F0D237', '#F78B6D', '#FA6672', '#32DBA2', '#B096E0', '#D2F2F7', '#50658F', '#FABDA2', '#C49B93', '#333'];
      this.play_key = 0;
      this.end_key = 0;
      this.target_ring;
      this.target_tower;
      this.current_tower;
      this.box_items = $(`main>section div`);
    }
    get getter_tower(){
      return this.tower;
    }
    get getter_name(){
      return this.name.peek();
    }
    set setter_ring(set_ring){
      this.ring = set_ring;
      this.odd = new Queue();
      this.even = new Queue();
      this.count = 1;
      this.A_tower = new Stack(1);
      this.B_tower = new Stack(2);
      this.C_tower = new Stack(3);
    }
    create_pattern(){    //--- create parttern list ---//
      for(let i=0; i<this.ring; i++){
        this.odd.offer(new Queue([2,3,1]));
        this.even.offer(new Queue([3,2,1]));
      }
    }
    create_ring(){    //--- create ring list ---//
      this.tower = new Queue([this.A_tower, this.B_tower, this.C_tower]);
      $(this.box_tower).empty();
      for(let i=this.ring; i>0; i--){
        this.tower.get(0).push(i);
        $(this.box_tower[0]).prepend(`<div>${i}</div>`);
        $(`main>section>div:first-child`).css({width: `${this.ring_width[i-1]}`, background: `${this.ring_color[i-1]}`});
      }
      this.box_items = $(`main>section div`);
    }
    move_ring(){    //--- move ring 1 turn ---//
      for(let i=this.ring-1; i>=0; i--){
        if((this.count % Math.pow(2, i)) == 0){    //--- find target ring ---//
          if((this.ring % 2) == 1){   //--- total ring count odd ---//
            if((i % 2) == 1){    //--- current ring odd ---//
              let prev_pos = -1;
              for(let j=0; j<3; j++){    //--- find prev position ---//
                (j==2) && (prev_pos = this.odd.get(i).peek());
                this.odd.get(i).offer(this.odd.get(i).poll());
              }
              this.target_ring = this.tower.get(prev_pos-1).pop();
              this.current_tower = this.tower.get(prev_pos-1);
              this.target_tower = this.tower.get(this.odd.get(i).peek()-1)
              this.target_tower.push(this.target_ring);    //--- move to tower from prev tower ---//
              this.odd.get(i).offer(this.odd.get(i).poll());    //--- chagnge next parttern ---//
            } else {    //--- current ring even ---//
              let prev_pos = -1;
              for(let j=0; j<3; j++){    //--- find prev position ---//
                (j==2) && (prev_pos = this.even.get(i).peek());
                this.even.get(i).offer(this.even.get(i).poll());
              }
              this.current_tower = this.tower.get(prev_pos-1);
              this.target_ring = this.tower.get(prev_pos-1).pop();
              this.target_tower = this.tower.get(this.even.get(i).peek()-1);
              this.target_tower.push(this.target_ring);    //--- move to tower from prev tower ---//
              this.even.get(i).offer(this.even.get(i).poll());    //--- chagnge next parttern ---//
            }
          } else {    //--- total ring count even ---//
            if((i % 2) == 1){    //--- current ring even ---//
              let prev_pos = -1;
              for(let j=0; j<3; j++){    //--- find prev position ---//
                (j==2) && (prev_pos = this.even.get(i).peek());
                this.even.get(i).offer(this.even.get(i).poll());
              }
              this.current_tower = this.tower.get(prev_pos-1);
              this.target_ring = this.tower.get(prev_pos-1).pop();
              this.target_tower = this.tower.get(this.even.get(i).peek()-1);
              this.target_tower.push(this.target_ring);    //--- move to tower from prev tower ---//
              this.even.get(i).offer(this.even.get(i).poll());    //--- chagnge next parttern ---//
            } else {    //--- current ring odd ---//
              let prev_pos = -1;
              for(let j=0; j<3; j++){    //--- find prev position ---//
                (j==2) && (prev_pos = this.odd.get(i).peek());
                this.odd.get(i).offer(this.odd.get(i).poll());
              }
              this.current_tower = this.tower.get(prev_pos-1);
              this.target_ring = this.tower.get(prev_pos-1).pop();
              this.target_tower = this.tower.get(this.odd.get(i).peek()-1);
              this.target_tower.push(this.target_ring);    //--- move to tower from prev tower ---//
              this.odd.get(i).offer(this.odd.get(i).poll());    //--- chagnge next parttern ---//
            }
          }
          break;
        }
      }
      this.count++;
    }
    async show_hanoi(){    //--- loop move_ring & end catch ---//
      this.loop = setTimeout(()=>{this.show_hanoi()}, 1000);
      this.move_ring();
      if(this.tower.get(2).size() == this.ring){
        clearTimeout(this.loop);
        $(`.popup_complete>p:nth-child(2)`).html(`TOTAL COUNT : ${this.count-1}`);
        this.end_key = 1;
      }
      //----------------------------
      let ring_tl = gsap.timeline({ defaults: { duration: 0.25, ease: "Power.easeOut" } })
      $(this.box_items).each((index,value)=>{
        if(this.target_ring == Number(value.innerHTML)){
          if( this.current_tower.num == 1 && this.target_tower.num == 2 ){
            ring_tl.fromTo(value,{ y: 0 }, { y: '-100vh' })
              .fromTo(value,{ x: 0 }, { x: '25vw' })
              .fromTo(value,{ y: '-100vh' }, { y: '-30vh' });
          } else if( this.current_tower.num == 1 && this.target_tower.num == 3 ){
            ring_tl.fromTo(value,{ y: 0 }, { y: '-100vh' })
              .fromTo(value,{ x: 0 }, { x: '60vw' })
              .fromTo(value,{ y: '-100vh' }, { y: '-30vh' });
          } else if( this.current_tower.num == 2 && this.target_tower.num == 1 ){
            ring_tl.fromTo(value,{ y: 0 }, { y: '-100vh' })
              .fromTo(value,{ x: 0 }, { x: '-25vw' })
              .fromTo(value,{ y: '-100vh' }, { y: '-30vh' });
          } else if( this.current_tower.num == 2 && this.target_tower.num == 3 ){
            ring_tl.fromTo(value,{ y: 0 }, { y: '-100vh' })
              .fromTo(value,{ x: 0 }, { x: '25vw' })
              .fromTo(value,{ y: '-100vh' }, { y: '-30vh' });
          } else if( this.current_tower.num == 3 && this.target_tower.num == 1 ){
            ring_tl.fromTo(value,{ y: 0 }, { y: '-100vh' })
              .fromTo(value,{ x: 0 }, { x: '-60vw' })
              .fromTo(value,{ y: '-100vh' }, { y: '-30vh' });
          } else if( this.current_tower.num == 3 && this.target_tower.num == 2 ){
            ring_tl.fromTo(value,{ y: 0 }, { y: '-100vh' })
              .fromTo(value,{ x: 0 }, { x: '-25vw' })
              .fromTo(value,{ y: '-100vh' }, { y: '-30vh' });
          }
        }
      })
      await sleep(950);
      gsap.set($(this.box_items), {x: 0, y: 0})
      this.read_count.value = this.count-1;
      gsap.fromTo(this.read_count, 
        { color: '#F65', borderColor: '#F65' },
        { color: '#333', borderColor: '#333', delay: 0.1 }
      );

      $(this.box_tower).empty();
      $(this.box_tower).each((index, target)=>{
        for(let i=0; i<this.tower.get(index).size(); i++){
          let current_ring = this.tower.get(index).all_arr()[i];
          $(target).prepend(`<div style="width: ${this.ring_width[current_ring-1]}; background: ${this.ring_color[current_ring-1]}">${current_ring}</div>`);
        }
        this.box_items = $(`main>section div`);
      })
      if(this.end_key == 1){
        gsap.fromTo(this.pop_up, 
          {transform: 'scale(0)'},
          {transform: 'scale(1)'}
        )
        this.end_key = 0;
        this.btn_reset.disabled = true;
      }
    }
    click_event(){    //--- button & input event ---//
      this.btn_close.addEventListener('click', (e)=>{
        this.btn_reset.disabled = false;
        gsap.fromTo(this.pop_up, 
          {transform: 'scale(1)'},
          {transform: 'scale(0)'}
        )
        this.btn_reset.click();
      })
      if(this.play_key == 0){
        this.input_ring.addEventListener('change', (e)=>{
          this.setter_ring = this.input_ring.value;
          this.create_ring();
        })
        this.btn_start.addEventListener('click', (e)=>{
          this.create_pattern();
          this.show_hanoi();
          this.btn_start.disabled = true;
          this.input_ring.disabled = true;
          gsap.set([this.btn_start, this.input_ring], { cursor: 'not-allowed' });
        })
        this.play_key = 1;
      }
      this.btn_reset.addEventListener('click', (e)=>{
        this.input_ring.value = 1;
        this.btn_start.disabled = false;
        this.input_ring.disabled = false;
        gsap.set([this.btn_start, this.input_ring], { cursor: 'pointer' });
        clearTimeout(this.loop);
        this.play_key = 0;
        this.setter_ring = 1
        this.create_ring();
      })
    }
  }
  hanoi_game = new Hanoi_Tower(1);
  hanoi_game.click_event();
  hanoi_game.create_ring();

})