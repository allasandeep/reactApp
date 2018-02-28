// component that contains all the logic and other smaller components
// that form the Read Products view
window.ReadProductsComponent = React.createClass({
    getInitialState: function() {
        return {
            products: []
        };
    },
 
    // on mount, fetch all products and stored them as this component's state
    componentDidMount: function() {
 
        this.serverRequest = $.get("http://localhost:8000/api/product/read.php", function (products) {
            this.setState({
                products: products.records
            });
        }.bind(this));
    },
 
    // on unmount, kill product fetching in case the request is still pending
    componentWillUnmount: function() {
        this.serverRequest.abort();
    },
 
    // render component on the page
    render: function() {
        // list of products
        var filteredProducts = this.state.products;
        $('.page-header h1').text('Read Products');
 
        return (
            <div className='overflow-hidden'>
                <TopActionsComponent changeAppMode={this.props.changeAppMode} />
 
                <ProductsTable
                    products={filteredProducts}
                    changeAppMode={this.props.changeAppMode} />
            </div>
        );
    }
});