import { Document, Text, Page, StyleSheet, View, Image } from '@react-pdf/renderer';
import { useEffect } from 'react';
import { baseUrl } from '../../utils/data';

function PDF({ data }) {
   
  const image = `${baseUrl}/img/${data.foto.split(',')[0].trim()}`;

  return (
    <Document>
      <Page style={styles.pageBackground}>
        <Text style={styles.titulo}>Datos de la Mascota</Text>
        <View style={styles.date}>
          
          <Text style={styles.text}>Nombre: {data.nombre_mascota}</Text>
          <Text style={styles.text}>Edad: {data.edad==0 ? "la mascoota pose menos de 1 año de edad" :`${data.edad} años`}</Text>
          <Text style={styles.text}>Descripción: {data.descripcion}</Text>
          <Text style={styles.text}>Historial Medico : {data.historial_medico}</Text>
          <Text style={styles.text}>Estado : {data.estado}</Text>
          
          <Text style={styles.text}>Genero : {data.genero}</Text>
          <Text style={styles.text}> Depatreamento: {data.nombre_departamento}</Text>
          <Text style={styles.text}> Municipio: {data.municipio}</Text>
          <Text style={styles.text}> Raza: {data.nombre_raza}</Text>
          <Text style={styles.text}> Categoria: {data.categoria}</Text>
        </View>
        <View>
        <Image
          style={styles.img}
          src={image}
          alt={"kokok"}
          onLoad={() => console.log('Imagen cargada correctamente')}
          onError={(error) => console.error(`Error al cargar la imagen: ${error}`)}
        />
        </View>
      </Page>
    </Document>
  );
}

const styles = StyleSheet.create({
  titulo: {
    fontSize: 24,
    marginLeft: "37%",
    marginBottom: 20,
    marginTop:23
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft:4,
    padding:6
  },
  pageBackground: {
    backgroundColor: "#1999a6",
  },
  img:{
    borderRadius:"23%",
    height:"57%",
    width:"30%",
    marginLeft:"18%",

    position:"relative",
    bottom:"53%", 
    left:"33%",
  },
  date:{
    marginTop:"16%"
  }
});

export default PDF;