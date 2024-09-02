import { Document, Text, Page, StyleSheet, View } from '@react-pdf/renderer';

function AdoptPero({ data }) {
  return (
    <Document>
      <Page style={style.main}>
      <Text style={style.title}>Mascotas Adoptadas</Text>
        <View style={style.container}>
          <View style={style.header}>
            <Text style={style.subheader}>Nombre Mascota</Text>
            <Text style={style.subheader}>Estado</Text>
            <Text style={style.subheader}>Nombre Adoptante</Text>
            <Text style={style.subheader}>Municipio</Text>
            <Text style={style.subheader}>Departamento</Text>
            <Text style={style.subheader}>Celular</Text>
          </View>

          {data.map((pet) => (
            <View key={pet.id} style={style.row}>
              <Text style={style.cell}>{pet.nombre_mascota}</Text>
              <Text style={style.cell}>{pet.estado}</Text>
              <Text style={style.cell}>{pet.nombre_usuario}</Text>
              <Text style={style.cell}>{pet.municipio}</Text>
              <Text style={style.cell}>{pet.nombre_departamento}</Text>
              <Text style={style.cell}>{pet.celular}</Text>
            </View>
          ))}
        </View>
      </Page>
    </Document>
  );
}

const style = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title:{
   textAlign:"center",
    fontSize:34,
    position:"absolute",
    top:"3%"
  },
  container: {
    borderWidth: 2,
    borderColor: '#1999a6',
    width: '100%',
    padding: 10,
    position:"relative",
    bottom:"37%",
    marginTop:"12%"
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 5,
  },
  subheader: {
    width: '16%',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 5,
  },
  cell: {
    width: '16%',
    textAlign: 'center',
    fontSize: 10,
    borderRight: 2,
    borderColor:"#1999a6"
  },
});

export default AdoptPero;