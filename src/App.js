import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import React, { useEffect, useState } from 'react';


const MyComponent = () => {
	const [data, setData] = useState(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await fetch('https://fernandafamiliar.soy/wp-json/wp/v2/posts'); // Reemplaza con tu URL de endpoint
				if (!response.ok) {
					throw new Error('La respuesta no fue correcta');
				}
				const jsonData = await response.json();
				setData(jsonData);
			} catch (error) {
				console.error('Error al obtener datos:', error);
			}
		};

		fetchData();

	}, []); // El array vacío [] como segundo argumento asegura que useEffect se ejecute solo una vez (al montar el componente)

	return (
		<div className="container App">
			{data ? (
				<div className="row">
					<div className="col-md-12">
						<h1>Noticias del día</h1>
						{
						data.map(
							posts => (
								<div className="card">
									<div className="card-body">
										<h5 className="card-title"><strong>{posts.title.rendered}</strong></h5>
										<img src={posts.jetpack_featured_media_url} class="img-fluid" alt="Imagen Responsiva"></img>
										{posts.excerpt.rendered}
									</div>
								</div>
							)
						)
						}
					</div>
				</div>
			) : (
				<p>Loading...</p>
			)}
		</div>
	);	

};

export default MyComponent;

