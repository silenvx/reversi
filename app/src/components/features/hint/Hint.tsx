import { ReversiGameType } from "@/hooks/reversiGame";

type GamePresenterProps = {
    reversiGame: ReversiGameType;
  };

export function Hint() {
    const neon_text = {
        color: '#FFFFFF',
        textShadow: '0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00'
      };
    
      const neon_button = {
        color: '#FFFFFF',
        backgroundColor: '#000000',
        textShadow: '0 0 5px #ff8c00, 0 0 10px #ff8c00, 0 0 20px #ff8c00, 0 0 40px #ff8c00',
        border: '2px solid #ff8c00'
      };
    
    return (
        <div className="hint-container">
            <div className="hint-box border">
                <h1 className="hint-title">ヒント</h1>
                <p>各スキルカードの効果は以下のとおりです。</p>
                <ul className="hint-list">
                    <li>リバース：1手前に</li>
                    <li>ランダム：相手のターンにランダムにコマを置く</li>
                </ul>
                <button className="hint-close-button" onClick={reversiGame.hint} style={neon_button}>
                    <p style={neon_text}>×</p>
                </button>
            </div>
        </div>
    );
}