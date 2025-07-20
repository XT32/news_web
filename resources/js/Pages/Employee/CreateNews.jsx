import '../../../css/dashboard.css';
import NavbarJurnalis from '../../Components/Layout/NavbarJurnalis.jsx';
import InputText from '../../Components/Input/InputText.jsx';
import DropdownKategori from '../../Components/Input/DropdownCategory.jsx';
import UploadImage from '../../Components/Input/UploadImage.jsx';
import TextEditor from '../../Components/Input/TextEditor.jsx'
import { useState } from 'react';

export default function CreateNews() {
    const [selectedKategori, setSelectedKategori] = useState("");

  const kategoriList = [
    { id: 1, kategori: "Politik" },
    { id: 2, kategori: "Ekonomi" },
    { id: 3, kategori: "Teknologi" },
    { id: 4, kategori: "Pendidikan" },
    { id: 5, kategori: "Olahraga" },
    { id: 6, kategori: "Kesehatan" },
    { id: 7, kategori: "Hiburan" },
    { id: 8, kategori: "Lingkungan" }
  ];

    return(
        <div className='dashboardAdmin'>
            <aside>
                <NavbarJurnalis/>
            </aside>
            <main>
                <h2>Tulis Berita</h2>
                <form className='createNews'>
                    <div className='inputNews'>
                        <InputText
                        label='Judul Berita'
                        placeholder='Masukan judul berita'/>
                    </div>
                    <div className="inputNews">
                        <DropdownKategori
                        kategoriList={kategoriList}
                        selectedKategori={selectedKategori}
                        onChange={setSelectedKategori}/>
                    </div>
                    <div className="inputNews"><UploadImage/></div>
                    <div className='inputNews'>
                        <InputText
                        label='Caption Gambar'
                        placeholder='Masukan Caption Gambar'/>
                    </div>
                    <div className='inputNews'>
                        <TextEditor/>
                    </div>
                    <div className="buttonContainer">
                        <button className='buttonCreateNews'>Draft</button>
                        <button className='buttonCreateNews'>Publish</button>
                    </div>
                </form>
            </main>
        </div>
    )
}