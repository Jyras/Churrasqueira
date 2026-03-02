import { useState, useEffect } from 'react'
import toast, { Toaster } from 'react-hot-toast'

function App() {
  const catalogoOriginal = [
    { id: 1, title: "Churrasqueira em Alvenaria", price: 2200.00, category: "Churrasqueiras", temFogao: false, desc: "Modelo clássico com braseiro reforçado e acabamento impecável.", image: "https://images.tcdn.com.br/img/img_prod/735732/churrasqueira_pre_moldada_tijolinho_65cm_com_kit_inox_1899_1_20200520150935.jpg" },
    { id: 2, title: "Churrasqueira com Fogão a lenha", price: 3200.00, category: "Combos", temFogao: true, desc: "União perfeita entre o churrasco e a comida caseira no fogão.", image: "https://i.pinimg.com/736x/2a/3e/1b/2a3e1b764038a8e10090887e5988019a.jpg" },
    { id: 3, title: "Trio: Churrasqueira, Fogão a Lenha e Forno de ferro", price: 6200.00, category: "Combos", temFogao: true, desc: "O conjunto completo para sua área gourmet.", image: "https://i.ytimg.com/vi/W-t7795q-Xo/maxresdefault.jpg" },
    { id: 4, title: "Quatro Peças: Churrasq, Fogão, Forno de ferro e Forno de Pizza", price: 12000.00, category: "Combos", temFogao: true, desc: "A experiência gourmet definitiva. Tudo em um só projeto.", image: "https://i.pinimg.com/originals/9e/7b/72/9e7b72803362688005399587f4850785.jpg" },
    { id: 5, title: "Churrasqueira e Forno de ferro", price: 4600.00, category: "Combos", temFogao: false, desc: "Ideal para assar carnes e pães simultaneamente.", image: "https://http2.mlstatic.com/D_NQ_NP_605994-MLB46440595333_062021-O.jpg" },
    { id: 6, title: "Churrasqueira e Forno de pizza", price: 4000.00, category: "Combos", temFogao: false, desc: "Para os amantes de churrasco e da culinária italiana.", image: "https://i.pinimg.com/originals/82/34/00/823400d36c04f981266e746594c7b897.jpg" },
    { id: 7, title: "Balcão", price: 450.00, category: "Complementos", temFogao: false, desc: "Balcão estrutural em alvenaria para apoio e pias.", image: "https://i.pinimg.com/736x/8d/f3/84/8df38466e31b6957a9e64e5888a101b5.jpg" },
    { id: 8, title: "Pilar", price: 1250.00, category: "Complementos", temFogao: false, desc: "Pilar de sustentação para telhados e varandas gourmet.", image: "https://i.pinimg.com/474x/6c/4d/4b/6c4d4b2956f48a80373801f964495574.jpg" },
    { id: 9, title: "Fogão a Lenha", price: 1800.00, category: "Peças", temFogao: true, desc: "Fogão a lenha tradicional com excelente tiragem.", image: "https://http2.mlstatic.com/D_NQ_NP_900669-MLB43516584281_092020-O.jpg" },
    { id: 10, title: "Forno de ferro", price: 1750.00, category: "Peças", temFogao: false, desc: "Forno de ferro fundido de alta durabilidade e retenção de calor.", image: "https://images.tcdn.com.br/img/img_prod/606548/forno_de_ferro_fundido_para_fogao_a_lenha_grande_porta_de_vidro_1145_1_20190704153039.jpg" },
    { id: 11, title: "Churrasqueira Rebocada", price: 2000.00, category: "Churrasqueiras", temFogao: false, desc: "Base pronta para receber o revestimento de sua preferência.", image: "https://images.tcdn.com.br/img/img_prod/606548/churrasqueira_pre_moldada_media_65cm_lisa_1203_1_20190808151556.jpg" },
    { id: 12, title: "Forno de pizza", price: 2100.00, category: "Peças", temFogao: false, desc: "Forno iglu clássico para pizzas crocantes e deliciosas.", image: "https://i.pinimg.com/originals/cf/84/04/cf8404a8835f8d77a837c76747864f7b.jpg" }
  ];

  const [produtos] = useState(catalogoOriginal)
  const [filtrados, setFiltrados] = useState(catalogoOriginal)
  const [busca, setBusca] = useState('')
  const [carrinho, setCarrinho] = useState([])
  const [mostrarCarrinho, setMostrarCarrinho] = useState(false)
  const [categoriaAtiva, setCategoriaAtiva] = useState('all')
  const [produtoSelecionado, setProdutoSelecionado] = useState(null)

  const [tijolo, setTijolo] = useState('Mesclado')
  const [bocas, setBocas] = useState('3 Bocas')

  useEffect(() => {
    let res = produtos.filter(p => p.title.toLowerCase().includes(busca.toLowerCase()))
    if (categoriaAtiva !== 'all') res = res.filter(p => p.category === categoriaAtiva)
    setFiltrados(res)
  }, [busca, categoriaAtiva, produtos])

  const adicionarAoCarrinho = (p) => {
    let detalhesStr = `(${tijolo}${p.temFogao ? ` - ${bocas}` : ''})`;
    const nomeCompleto = `${p.title} ${detalhesStr}`;
    const idUnico = p.id + tijolo + (p.temFogao ? bocas : '');

    const ex = carrinho.find(i => i.idUnico === idUnico)
    if (ex) {
      setCarrinho(carrinho.map(i => i.idUnico === idUnico ? { ...i, qtd: i.qtd + 1 } : i))
    } else {
      setCarrinho([...carrinho, { ...p, idUnico, title: nomeCompleto, qtd: 1 }])
    }
    toast.success('Adicionado ao pedido!')
    setProdutoSelecionado(null)
  }

  const total = carrinho.reduce((acc, i) => acc + (i.price * i.qtd), 0)

  const finalizarNoWhatsApp = () => {
    if (carrinho.length === 0) return toast.error("Seu carrinho está vazio!")
    const itensMsg = carrinho.map(i => `• ${i.qtd}x ${i.title}`).join('\n')
    const msg = encodeURIComponent(`🔥 *PEDIDO DE ORÇAMENTO*\n\n${itensMsg}\n\n💰 *Total: R$ ${total.toFixed(2)}*`)
    window.open(`https://wa.me/5518996372963?text=${msg}`, '_blank')
  }

  return (
    <div className="min-h-screen relative font-sans">
      <Toaster position="bottom-center" />

      {/* --- ATUALIZAÇÃO: IMAGEM DE FUNDO --- */}
      <div
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat bg-fixed"
        style={{ backgroundImage: 'url("https://images.tcdn.com.br/img/img_prod/903785/kit_2_em_1_churrasqueira_e_fogao_3_bocas_de_tijolinho_aparente_palha_mesclado_1587_2_1de6de833ec45ffbd2c3820b2c1ea217.jpg")' }}
      >
        <div className="absolute inset-0 bg-stone-200/3npm5 backdrop-blur-[3px]"></div>
      </div>

      {/* NAVBAR */}
      <nav className="flex justify-between items-center p-6 sticky top-0 z-50 bg-white/70 backdrop-blur-xl border-b border-stone-200">
        <h1 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter text-stone-800">
          José <span className="text-amber-600">Churrasqueiras</span>
        </h1>
        <button onClick={() => setMostrarCarrinho(true)} className="bg-amber-700 text-white px-5 py-2 rounded-full font-bold shadow-lg hover:scale-105 transition-all text-sm">
          🛒 {carrinho.reduce((acc, item) => acc + item.qtd, 0)} Itens
        </button>
      </nav>

      {/* HEADER */}
      <header className="flex flex-col items-center pt-12 pb-10 px-4 relative z-10">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-5xl font-black text-stone-800 mb-2 uppercase tracking-tight">Showroom Gourmet</h2>
          <p className="text-stone-600 font-medium italic">Qualidade em cada detalhe da alvenaria.</p>
        </div>

        <input
          type="text"
          placeholder="O que deseja construir?"
          className="w-full max-w-md px-6 py-4 rounded-2xl bg-white text-stone-800 border-none shadow-2xl outline-none mb-6 focus:ring-2 focus:ring-amber-500 transition-all"
          onChange={(e) => setBusca(e.target.value)}
        />

        <div className="flex gap-2 overflow-x-auto max-w-full no-scrollbar pb-2">
          {[{ id: 'all', n: 'Tudo' }, { id: 'Combos', n: 'Combos' }, { id: 'Churrasqueiras', n: 'Churrasqueiras' }, { id: 'Peças', n: 'Peças' }, { id: 'Complementos', n: 'Acessórios' }].map(c => (
            <button key={c.id} onClick={() => setCategoriaAtiva(c.id)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap shadow-sm ${categoriaAtiva === c.id ? 'bg-amber-700 text-white' : 'bg-white/80 text-stone-500 border border-stone-200 hover:bg-white'}`}>{c.n}</button>
          ))}
        </div>
      </header>

      {/* GRID DE PRODUTOS */}
      <main className="max-w-7xl mx-auto p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
        {filtrados.map(item => (
          <div key={item.id} className="bg-white/80 backdrop-blur-md p-5 rounded-[2.5rem] shadow-xl border border-white/50 flex flex-col justify-between hover:shadow-2xl hover:-translate-y-1 transition-all group cursor-pointer" onClick={() => { setProdutoSelecionado(item); setTijolo('Mesclado'); setBocas('3 Bocas'); }}>
            <div className="h-48 flex justify-center p-1 bg-white/50 rounded-3xl mb-4 overflow-hidden shadow-inner">
              <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
            </div>
            <h3 className="text-stone-800 font-black text-xs uppercase mb-3 leading-tight px-1">{item.title}</h3>
            <div className="flex justify-between items-center mt-auto px-1">
              <span className="text-xl font-black text-amber-800 tracking-tighter">R$ {item.price.toFixed(2)}</span>
              <span className="text-[10px] bg-stone-800 text-white px-3 py-1.5 rounded-full font-bold uppercase">Ver Mais</span>
            </div>
          </div>
        ))}
      </main>

      {/* MODAL AMPLIADO (QUASE TELA CHEIA) */}
      {produtoSelecionado && (
        <div className="fixed inset-0 bg-stone-900/70 backdrop-blur-xl z-[200] flex items-center justify-center p-2 md:p-6">
          <div className="bg-white/95 w-full h-[95vh] md:w-[95vw] rounded-[30px] md:rounded-[50px] overflow-hidden shadow-2xl flex flex-col md:flex-row relative animate-in zoom-in-95 duration-300">
            <button onClick={() => setProdutoSelecionado(null)} className="absolute top-6 right-8 text-5xl text-stone-300 hover:text-amber-700 z-[210] transition-colors">×</button>

            <div className="w-full md:w-3/5 h-[35%] md:h-full bg-stone-100 overflow-hidden">
              <img src={produtoSelecionado.image} className="w-full h-full object-cover" />
            </div>

            <div className="w-full md:w-2/5 p-8 md:p-16 flex flex-col bg-white/80 overflow-y-auto">
              <span className="text-amber-600 font-black text-sm uppercase tracking-widest mb-4">{produtoSelecionado.category}</span>
              <h2 className="text-3xl md:text-5xl font-black text-stone-800 mb-8 uppercase leading-tight tracking-tighter">{produtoSelecionado.title}</h2>

              <div className="mb-6">
                <p className="text-stone-400 text-[10px] font-bold uppercase mb-4 tracking-widest">1. Acabamento do Tijolo</p>
                <div className="flex gap-4">
                  {['Mesclado', 'Palha'].map(t => (
                    <button key={t} onClick={() => setTijolo(t)} className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${tijolo === t ? 'border-amber-700 bg-amber-50 text-amber-700 shadow-md' : 'border-stone-100 text-stone-400 hover:bg-stone-50'}`}>
                      {t === 'Mesclado' ? '🧱 ' : '🎨 '} {t}
                    </button>
                  ))}
                </div>
              </div>

              {produtoSelecionado.temFogao && (
                <div className="mb-10">
                  <p className="text-stone-400 text-[10px] font-bold uppercase mb-4 tracking-widest">2. Chapa do Fogão</p>
                  <div className="flex gap-4">
                    {['3 Bocas', '4 Bocas'].map(b => (
                      <button key={b} onClick={() => setBocas(b)} className={`flex-1 py-4 rounded-2xl font-bold border-2 transition-all ${bocas === b ? 'border-amber-700 bg-amber-50 text-amber-700 shadow-md' : 'border-stone-100 text-stone-400 hover:bg-stone-50'}`}>
                        🔥 {b}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-stone-500 text-lg mb-10 border-l-4 border-amber-500/30 pl-6 italic leading-relaxed">"{produtoSelecionado.desc}"</p>

              <div className="mt-auto">
                <span className="text-stone-400 text-[10px] font-bold uppercase mb-1 block tracking-widest">Orçamento Estimado</span>
                <span className="text-6xl font-black text-stone-900 tracking-tighter mb-8 block">R$ {produtoSelecionado.price.toFixed(2)}</span>
                <button onClick={() => adicionarAoCarrinho(produtoSelecionado)} className="w-full bg-amber-700 text-white py-7 rounded-3xl font-black text-2xl hover:bg-stone-900 transition-all shadow-2xl shadow-amber-700/20 active:scale-95">
                  ADICIONAR AO PEDIDO
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CARRINHO LATERAL */}
      {mostrarCarrinho && (
        <div className="fixed inset-0 bg-stone-900/60 backdrop-blur-md z-[300] flex justify-end">
          <div className="w-full max-w-md bg-white h-full p-8 flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
            <div className="flex justify-between items-center mb-8 border-b border-stone-100 pb-4">
              <h2 className="text-2xl font-black text-stone-800 italic uppercase tracking-tighter">Meu Pedido</h2>
              <button onClick={() => setMostrarCarrinho(false)} className="text-4xl text-stone-300 hover:text-stone-800">×</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4">
              {carrinho.length === 0 ? (
                <p className="text-center text-stone-400 mt-20 italic">Seu orçamento está vazio...</p>
              ) : (
                carrinho.map(item => (
                  <div key={item.idUnico} className="bg-stone-50 p-5 rounded-3xl border border-stone-100 relative group">
                    <button onClick={() => setCarrinho(carrinho.filter(i => i.idUnico !== item.idUnico))} className="absolute top-2 right-4 text-stone-300 hover:text-red-500">×</button>
                    <span className="text-[11px] font-black uppercase text-stone-800 block mb-1 leading-tight">{item.title}</span>
                    <span className="text-amber-700 font-black text-sm">x{item.qtd} — R$ {(item.price * item.qtd).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
            <div className="mt-8 pt-8 border-t-2 border-dashed border-stone-100">
              <div className="flex justify-between items-end mb-8">
                <span className="text-stone-400 font-bold text-xs uppercase tracking-widest">Total Geral</span>
                <span className="text-4xl font-black text-stone-900 tracking-tighter">R$ {total.toFixed(2)}</span>
              </div>
              <button onClick={finalizarNoWhatsApp} className="w-full bg-green-600 text-white py-6 rounded-3xl font-black text-xl shadow-xl hover:bg-green-700 transition-all flex items-center justify-center gap-2">
                FINALIZAR NO WHATSAPP 📱
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App