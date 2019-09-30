@extends('AdminWidget')
@section('title','Thêm size')
@section('banner','Thêm size')
@section('content')

<div class="col-md-12">
	<div class="card card-user">
		<div class="card-header">
			<h5 class="card-title">Điền Size</h5>
		</div>
		<div class="card-body" style="min-height: 0px">
			<form action="{{url('quanly/size/them')}}" method="post">
				{{ csrf_field() }}
				<div class="row">
					<div class="col-10">
						<div class="form-group">
							<label>Size</label>
							<input type="text" class="form-control" name="name" value="{{old('name')}}" placeholder="VD: 38">
						</div>
					</div>
					<div class="col-2 mt-xl-3 mt-md-3 mt-sm-0">
						<button type="submit" class="btn btn-primary btn-round">Thêm</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

@endsection